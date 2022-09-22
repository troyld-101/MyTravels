import Me from "../pics/50cal&me.JPG";
import React from "react";

export default function Navy() {
  return (
    <section className="navy">
      <img src={Me} className="navyPic" alt="meNavy" />
      <h1 className="navyHeader">Some of my travels</h1>
      <h2 className="navyText">
        Here are some of my favorite places I have visited while serving in the
        US Navy.
      </h2>
    </section>
  );
}
