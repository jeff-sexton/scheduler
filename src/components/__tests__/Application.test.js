import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getByAltText,
  getByPlaceholderText,
  prettyDOM,
  getAllByTestId,
} from "@testing-library/react";

import Application from "components/Application";

import { cleanUpFixture } from "__mocks__/axios";
import axios from "axios";

beforeEach(() => {
  cleanUpFixture();
});

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Current weekday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));
    expect(getByText(/Leopold Silvers/i)).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Monday"));
    fireEvent.click(getByText(container, "Monday"));

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /Saving/i)).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const monday = getAllByTestId(container, "day").find((elem) =>
      getByText(elem, "Monday")
    );
    expect(getByText(monday, /no spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Monday"));
    fireEvent.click(getByText(container, "Monday"));

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment")[1];
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const monday = getAllByTestId(container, "day").find((elem) =>
      getByText(elem, "Monday")
    );
    expect(getByText(monday, /2 spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Monday"));
    fireEvent.click(getByText(container, "Monday"));

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[1];

    // 3. Click the "Edit" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Edit"));

    // Select First interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Edit the student name to be "Archie Leonard Cohen"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Archie Leonard Cohen" },
    });

    // 3. Click the "Save" button on the booked appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, /Saving/i)).toBeInTheDocument();
    // // 7. Wait until the text "Archie Leonard Cohen" is displayed.
    await waitForElement(() => getByText(appointment, "Archie Leonard Cohen"));
    expect(getByText(appointment, /Sylvia Palmer/i)).toBeInTheDocument();
    // // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const monday = getAllByTestId(container, "day").find((elem) =>
      getByText(elem, "Monday")
    );
    expect(getByText(monday, /1 spot remaining/i)).toBeInTheDocument();
  });
  // "shows the save error when failing to save an appointment"
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Monday"));
    fireEvent.click(getByText(container, "Monday"));

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /Saving/i)).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, /Something Went Wrong Saving/i));

    fireEvent.click(getByAltText(appointment, "Close"));

    expect(getByPlaceholderText(appointment, /enter student name/i)).toBeInTheDocument();
  });

  // "shows the delete error when failing to delete an existing appointment"
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Monday"));
    fireEvent.click(getByText(container, "Monday"));

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment")[1];
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, /Something Went Wrong Deleting/i));
    
    fireEvent.click(getByAltText(appointment, "Close"));
    
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
  });

});
