import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "../index";

afterEach(cleanup);

describe("Appointment", () => {
  it.skip("renders without crashing", () => {
    render(<Appointment />);
  });
});

// "loads data, cancels an interview and increases the spots remaining for Monday by 1"
// "loads data, edits an interview and keeps the spots remaining for Monday the same"
// "shows the save error when failing to save an appointment"
// "shows the delete error when failing to delete an existing appointment"
