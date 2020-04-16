import {useState, useEffect} from 'react';
import axios from 'axios';

const useApplicationData = () => {

  const todaysWeekday = Intl.DateTimeFormat('en-US', { weekday: 'long'}).format(Date.now());

  const [state, setState] = useState(
    {
      days: [],
      day: todaysWeekday,
      appointments: {},
      interviewers: {}
    }
  );
  
  const setDay = day => setState({...state, day });
  useEffect(()=> {
    const daysPromise = axios.get(`/api/days`);
    const appointmentsPromise = axios.get(`/api/appointments`);
    const interviewersPromise = axios.get(`/api/interviewers`);
    
    Promise.all([daysPromise, appointmentsPromise, interviewersPromise])
    .then(([daysResponse, appointmentsResponse, interviewersResponse]) => {
      setState(prev => ({...prev, days: daysResponse.data, appointments: appointmentsResponse.data, interviewers: interviewersResponse.data }));
    });
  },[]);

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
  
  const apiRequest = (appointment, method) => {
    const appointments = {
      ...state.appointments,
      [appointment.id]: appointment
    };

  return axios[method](`/api/appointments/${appointment.id}`, appointment)
    .then(() => {
      return axios.get('/api/days');
    })
    .then(({data: days}) => {
      setState({ ...state, appointments, days});
    })
  };
  
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    return apiRequest(appointment, 'put');
    };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    return apiRequest(appointment, 'delete');
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
