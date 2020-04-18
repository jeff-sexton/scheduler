import { useEffect, useReducer} from 'react';
import axios from 'axios';

const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = "SET_INTERVIEW";

const reducer = (state, action) => {

  const SET_DAY = ({value: day}) => ({...state, day });

  const SET_APPLICATION_DATA = ({value}) => ({...state, ...value });

  const SET_INTERVIEW = ({value : {days, appointment}}) => {
    const appointments = {
      ...state.appointments,
      [appointment.id]: appointment
    };

    return { ...state, days, appointments };
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
    DEFAULT
  };

  return (actions[action.type] || actions.DEFAULT)(action);
}


const useApplicationData = () => {

  const todaysWeekday = Intl.DateTimeFormat('en-US', { weekday: 'long'}).format(Date.now());

  const [state, dispatch] = useReducer(reducer,
    {
      days: [],
      day: todaysWeekday,
      appointments: {},
      interviewers: {}
    }
  );

  // Establish client websockets connection with api server
  useEffect(() => {
    const apiSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL, 'JSON');

    apiSocket.onopen = function (event) {
      apiSocket.send("ping"); 
    };

    apiSocket.onmessage = function (event) {
      console.log('Message Received: ', event.data);
      console.log('Parsed: ', JSON.parse(event.data));

    }
    
  }, []);
  
  // Get initial applicaion data from api server
  useEffect(()=> {
    const daysPromise = axios.get(`/api/days`);
    const appointmentsPromise = axios.get(`/api/appointments`);
    const interviewersPromise = axios.get(`/api/interviewers`);
    
    Promise.all([daysPromise, appointmentsPromise, interviewersPromise])
    .then(([{data : days}, {data : appointments}, {data : interviewers}]) => {
      dispatch({
        type: SET_APPLICATION_DATA, 
        value: {days, appointments, interviewers} 
      });
    });
  },[]);

  // Update day selection fron user input
  const setDay = day => dispatch({type: SET_DAY, value: day });

  // hangle appointment updates with the api server
  const updateAppointment = (appointment, method) => {

  return axios[method](`/api/appointments/${appointment.id}`, appointment)
    .then(() => {
      return axios.get('/api/days');
    })
    .then(({data: days}) => {
      dispatch({ 
        type: SET_INTERVIEW, 
        value: {appointment, days}
      });
    })
  };

    // const getUpdatedDays = ({state, appointmentId, step}) => {

  //   return state.days.map(day => 
  //     {
  //       if(day.appointments.includes(appointmentId)) {
  //         // const newSpots = add ? Math.max(day.spots - 1, 0) : Math.min(day.spots + 1, 5); 
  //         return {...day, appointments: [...day.appointments], interviewers: [...day.interviewers], spots: day.spots + step };
  //       }
  //       return {...day, appointments: [...day.appointments], interviewers: [...day.interviewers]};
  //     }
  //   );
  // };
  
  // Update the interview in an appointment slot - either create a new appointment or update an existing one
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    return updateAppointment(appointment, 'put');
    };

  // Remove the interview in an appointment slot
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    return updateAppointment(appointment, 'delete');
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
