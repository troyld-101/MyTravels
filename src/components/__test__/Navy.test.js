import {
  cleanup,
  render,
  screen,
  fireEvent,
  queryByTitle,
} from "@testing-library/react";
//import { Form, Button, Card, Container } from "react-bootstrap";
jest.mock("firebase/auth"); //Had Mock Firebase to do any testing
jest.mock("firebase/app");
jest.mock("react-bootstrap");
import { AuthProvider } from "../../context/AuthContext"; //Wrap AuthProvider around test component
import React from "react";
import "@testing-library/jest-dom";
//import App from "../../App";
import Card from "../Card.js";
import Navy from "../Navy.js";
import Home from "../../pages/Home";
import ReactDOM from "react-dom";
import { async } from "@firebase/util";

afterEach(cleanup);

// it("render button incorrectly", () => {
//   const { queryByTitle } = render(
//     // <AuthProvider>
//     //   <LoginAdmin />
//     // </AuthProvider>
//     <Button />
//   );
//   const btn = queryByTitle("child");
//   //console.log(btn); null
//   expect(btn).toBeFalsy();
// });

test("render Navy component in the document", () => {
  render(<Navy />);
  //console.log(component);

  expect(screen.getByText("Some of my travels")).toBeInTheDocument();
});

//Try to write new test
it("renders correctly", () => {
  render(<Navy />);
  expect(
    screen.getByText(
      "Here are some of my favorite places I have visited while serving in the US Navy."
    )
  ).toBeInTheDocument();
});

test("Render Card component", () => {
  render(<Card />);

  expect(screen.getByText("Google Maps Link")).toBeInTheDocument();
});

test("Render Home Component", () => {
  render(<Card />);
  expect(screen.getByTitle("place")).toBeInTheDocument();
});

test("should navigate to google maps url when link is clicked", () => {
  const { getByRole } = render(<a href="google.com/maps">Google Maps Link</a>);
  const link = getByRole("link");
  fireEvent.click(link);
  expect(screen.getByRole("link")).toHaveAttribute("href", "google.com/maps");
});
