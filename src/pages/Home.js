import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import clipart from "../pics/travel1.jpg";
import Navy from "../components/Navy";
import Card from "../components/Card";
import places from "../places";

const Home = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/loginAdmin");
    } catch (e) {
      console.error(e);
      setError("Failed to log out");
    }
  }

  return (
    <div id="main">
      <nav>
        <p className={"errmsg"} aria-live="assertive">
          {error}
        </p>
        <img src={clipart} className="nav-image" />
        <h1>
          Welcome!! See My Worldly Travels! {currentUser && currentUser.email}
        </h1>

        <button title="logoutbtn" className="logout" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <Navy />
      {places.map((item) => (
        <Card
          key={item.id}
          city={item.city}
          country={item.country}
          googleMapsUrl={item.googleMapsUrl}
          imageUrl={item.imageUrl}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default Home;
