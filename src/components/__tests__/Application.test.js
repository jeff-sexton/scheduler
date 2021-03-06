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
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Monday"));
    fireEvent.click(getByText(container, "Monday"));

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[1];
    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    const monday = getAllByTestId(container, "day").find((elem) =>
      getByText(elem, "Monday")
    );
    expect(getByText(monday, /2 spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Monday"));
    fireEvent.click(getByText(container, "Monday"));

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[1];

    fireEvent.click(getByAltText(appointment, "Edit"));

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Archie Leonard Cohen" },
    });

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /Saving/i)).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Archie Leonard Cohen"));
    expect(getByText(appointment, /Sylvia Palmer/i)).toBeInTheDocument();

    const monday = getAllByTestId(container, "day").find((elem) =>
      getByText(elem, "Monday")
    );
    expect(getByText(monday, /1 spot remaining/i)).toBeInTheDocument();
  });

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

    await waitForElement(() =>
      getByText(appointment, /Something Went Wrong Saving/i)
    );

    fireEvent.click(getByAltText(appointment, "Close"));

    expect(
      getByPlaceholderText(appointment, /enter student name/i)
    ).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Monday"));
    fireEvent.click(getByText(container, "Monday"));

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[1];
    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, /Something Went Wrong Deleting/i)
    );

    fireEvent.click(getByAltText(appointment, "Close"));

    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
  });
});
