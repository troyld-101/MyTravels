import React from "react";
import { Container } from "react-bootstrap";

//Props
export default function Card(props) {
  return (
    <div className="stupid">
      <div>
        <img src={props.imageUrl} className="place" title="place" />
      </div>
      <div className="cardtext">
        <div className="cardlocation">
          <span className="location">{props.location}</span>
          <p className="mywords">
            <a href={props.googleMapsUrl} target="_blank" rel="noreferrer">
              Google Maps Link
            </a>
          </p>
        </div>
        <h2 className="card-city">{props.city}</h2>
        <h3 className="card-country">{props.country}</h3>

        <p className="card-description">
          <span id="words">{props.description}</span>
        </p>
      </div>
    </div>
  );
}
