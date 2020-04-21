import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const reducer = (state, action) => {
  const SET_DAY = ({ value: { day } }) => ({ ...state, day });
  const SET_APPLICATION_DATA = ({ value }) => ({ ...state, ...value });
  const SET_INTERVIEW = ({ value: { id, interview, days } }) => {
    const appointments = {
      ...state.appointments,
      [id]: { ...state.appointments[id], interview },
    };

    return { ...state, appointments, days };
  };

  const DEFAULT = () => {
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  };

  const actions = {
    SET_DAY,
    SET_APPLICATION_DATA,
    SET_INTERVIEW,
    DEFAULT,
  };

  return (actions[action.type] || actions.DEFAULT)(action);
};
const useApplicationData = () => {
  // Determine intital selected day for user - either current weekday or Monday if it is currently a weekend
  const todaysWeekday = Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(Date.now());
  const selectedWeekday =
    todaysWeekday === "Saturday" || todaysWeekday === "Sunday"
      ? "Monday"
      : todaysWeekday;

  const [state, dispatch] = useReducer(reducer, {
    days: [],
    day: selectedWeekday,
    appointments: {},
    interviewers: {},
  });

  // Establish client websockets connection with api server
  useEffect(() => {
    const apiSocket = new WebSocket(
      process.env.REACT_APP_WEBSOCKET_URL,
      "JSON"
    );

    apiSocket.onopen = function (event) {
      apiSocket.send("ping");
    };

    apiSocket.onmessage = function (event) {
      const { type, id, interview } = JSON.parse(event.data);

      // respond to websocket interview update
      if (type === SET_INTERVIEW) {
        updateDays().then((days) => {
          dispatch({ type: SET_INTERVIEW, value: { id, interview, days } });
        });
      }
    };
  }, []);

  // Get initial applicaion data from api server
  useEffect(() => {
    const daysPromise = axios.get(`/api/days`);
    const appointmentsPromise = axios.get(`/api/appointments`);
    const interviewersPromise = axios.get(`/api/interviewers`);

    Promise.all([daysPromise, appointmentsPromise, interviewersPromise]).then(
      ([{ data: days }, { data: appointments }, { data: interviewers }]) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          value: { days, appointments, interviewers },
        });
      }
    );
  }, []);

  // Update day selection fron user input
  const setDay = (day) => dispatch({ type: SET_DAY, value: { day } });

  const updateDays = () => {
    return axios.get("/api/days").then(({ data: days }) => days);
  };

  const calcUpdatedDays = ({ id, step }) => {
    return state.days.map((day) => {
      if (day.appointments.includes(id)) {
        return {
          ...day,
          appointments: [...day.appointments],
          interviewers: [...day.interviewers],
          spots: day.spots + step,
        };
      }
      return {
        ...day,
        appointments: [...day.appointments],
        interviewers: [...day.interviewers],
      };
    });
  };

  // hangle appointment updates with the api server
  const updateAppointment = (id, interview = null, method) => {
    const appointment = {
      ...state.appointments[id],
      interview,
    };

    return (
      axios[method](`/api/appointments/${appointment.id}`, appointment)

        // local spots calculation
        // .then(() => {
        //   const days = interview ? calcUpdatedDays(id, -1) : calcUpdatedDays(id, +1);
        //   dispatch({type: SET_INTERVIEW, value: {id, interview, days}});
        // })

        // do we need to dispatch here if we expect a websocket response??
        .then(() => {
          return updateDays();
        })
        .then((days) =>
          dispatch({ type: SET_INTERVIEW, value: { id, interview, days } })
        )
    );
  };

  // Update the interview in an appointment slot - either create a new appointment or update an existing one
  const bookInterview = (id, interview) => {
    return updateAppointment(id, interview, "put");
  };

  // Remove the interview in an appointment slot
  const cancelInterview = (id) => {
    return updateAppointment(id, null, "delete");
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
