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

afterEach(cleanup);

it.skip("renders without crashing", () => {
  render(<Application />);
});

describe("Application", () => {
  it("defaults to Current weekday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    const todaysWeekday = Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(Date.now());
    const selectedWeekday =
      todaysWeekday === "Saturday" || todaysWeekday === "Sunday"
        ? "Monday"
        : todaysWeekday;

    await waitForElement(() => getByText(selectedWeekday));

    fireEvent.click(getByText("Tuesday"));
    expect(getByText(/Leopold Silvers/i)).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

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
});
