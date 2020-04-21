import WS from "jest-websocket-mock";

const server = new WS("ws://localhost:8080");

const fixtures = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2],
      interviewers: [1, 2],
      spots: 1,
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [3, 4],
      interviewers: [3, 4],
      spots: 1,
    },
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": {
      id: 2,
      time: "1pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Leopold Silvers", interviewer: 4 },
    },
    "4": { id: 4, time: "3pm", interview: null },
  },
  interviewers: {
    "1": {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    },
    "3": {
      id: 3,
      name: "Mildred Nazir",
      avatar: "https://i.imgur.com/T2WwVfS.png",
    },
    "4": {
      id: 4,
      name: "Cohana Roy",
      avatar: "https://i.imgur.com/FK8V841.jpg",
    },
  },
};

const get = jest.fn((url) => {
  const lookup = {
    "/api/days": "days",
    "/api/appointments": "appointments",
    "/api/interviewers": "interviewers",
  };

  const response = Promise.resolve({
    status: 200,
    statusText: "OK",
    data: fixtures[lookup[url]],
  });

  return (lookup[url] && response) || Promise.reject();
});

const put = jest.fn((url, payload) => {
  // Update day spots
  fixtures.days[0].spots -= 1;

  const { id, interview } = payload;

  const response = JSON.stringify({
    type: "SET_INTERVIEW",
    id,
    interview,
  });

  setTimeout(() => {
    server.send(response);
    WS.clean();
    // do something with websockets
  }, 2000);

  return Promise.resolve({ status: 204, statusText: "No Content" });
});

const axios = {
  get,
  put,
};

export default axios;
