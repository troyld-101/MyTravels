import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { Container } from "react-bootstrap";

const RegisterAdmin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/loginAdmin");
    } catch (e) {
      console.log(e);
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card className="signup">
            <Card.Body>
              <p className={"errmsg"} aria-live="assertive">
                {error}
              </p>
              <h1 className="text-center mb-4">Register</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Label className="mt-2" htmlFor="email">
                  Email:
                </Form.Label>
                <Form.Control
                  type="text"
                  id="email"
                  ref={emailRef}
                  autoComplete="off"
                  required
                />

                <Form.Label className="mt-2" htmlFor="password">
                  Password:
                </Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  required
                  ref={passwordRef}
                />

                <Form.Label className="mt-2" htmlFor="confirm_pwd">
                  Confirm Password:
                </Form.Label>
                <Form.Control
                  type="password"
                  id="confirm_pwd"
                  required
                  ref={passwordConfirmRef}
                />

                <button className="w-100 mt-5" disabled={loading}>
                  Sign Up
                </button>
              </Form>
              <p>
                Already registered?
                <br />
                <span className="line">
                  <Link to="/loginAdmin">Sign In</Link>
                </span>
              </p>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default RegisterAdmin;
