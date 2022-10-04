import { React, useState, useEffect } from "react";
import { db } from "../firebase.js";
import { useAuth } from "../context/AuthContext";
import { Button, Container } from "react-bootstrap";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

export default function Wishlist() {
  const [newCountry, setNewCountry] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newYear, setNewYear] = useState(0);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const { currentUser } = useAuth();
  const ColRef = collection(db, "locations");
  //User Unique ID
  const q = query(
    collection(db, "locations"),
    where("userid", "==", currentUser.uid)
  );

  console.log(currentUser);

  const createLocation = async () => {
    setLoading(true);
    await addDoc(ColRef, {
      country: newCountry,
      city: newCity,
      year: newYear,
      userid: currentUser.uid,
    });
    setLoading(false);
  };

  const updateLocation = async (id) => {
    setLoading(true);
    const locationDoc = doc(db, "locations", id);
    const newFields = { year: newYear, country: newCountry, city: newCity };
    await updateDoc(locationDoc, newFields);
    setLoading(false);
  };

  const deleteLocation = async (id) => {
    setLoading(true);
    const locationDoc = doc(db, "locations", id);
    await deleteDoc(locationDoc);
    setLoading(false);
  };

  useEffect(() => {
    const getLocation = async () => {
      const data = await getDocs(q);
      setLocations(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getLocation();
  }, []);

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="App">
          <h1 className="w-100 mt-5" title="travel">
            Your Travels
          </h1>
          <input
            className="input"
            placeholder="Country..."
            onChange={(event) => {
              setNewCountry(event.target.value);
            }}
          />
          <input
            className="input"
            placeholder="City..."
            onChange={(event) => {
              setNewCity(event.target.value);
            }}
          />
          <input
            className="input"
            placeholder="My Year..."
            onChange={(event) => {
              setNewYear(event.target.value);
            }}
          />

          <Button
            className="w-100 mb-5 mt-5 btn btn-light"
            onClick={createLocation}
            disabled={loading}
            type="submit"
            id="btn"
          >
            {" "}
            Create Location
          </Button>
          <hr />
          {locations.map((location) => {
            return (
              <div>
                {" "}
                <h3>Country: {location.country}</h3>
                <h3>City: {location.city}</h3>
                <h4>Year: {location.year}</h4>
                <Button
                  className="w-100 mt-4 btn btn-light"
                  disabled={loading}
                  onClick={() => {
                    updateLocation(location.id, location.year);
                  }}
                >
                  {" "}
                  Update
                </Button>
                <Button
                  className="w-100 mt-3 mb-3 btn btn-light"
                  disabled={loading}
                  onClick={() => {
                    deleteLocation(location.id);
                  }}
                >
                  {" "}
                  Delete Location
                </Button>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}
