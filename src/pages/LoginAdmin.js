import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Card, Container } from "react-bootstrap";

const LoginAdmin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
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

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (e) {
      console.log(e);
      setError("Failed to sign in");
    }

    setLoading(false);
  }

  return (
    <>
      <Container
        id="loginstyle"
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card className="login-card">
            <Card.Body>
              <p className={"errmsg"} aria-live="assertive">
                {error}
              </p>
              <h1 className="text-center mb-4">Login</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Label
                  className="mt-2"
                  htmlFor="email"
                  data-testid="email"
                >
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

                <Button
                  disabled={loading}
                  className="w-100 mt-5"
                  type="submit"
                  data-testid="child"
                  title="thebtn"
                  role="button"
                >
                  Log In
                </Button>
              </Form>
              <div className="w-100 text-center mt-2">
                Not registered?
                <br />
                <span className="line">
                  <Link to="/registerAdmin">Sign Up</Link>
                </span>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default LoginAdmin;
