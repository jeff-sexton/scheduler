import {useState, useEffect} from 'react';
import axios from 'axios';

const useApplicationData = () => {

  const [state, setState] = useState(
    {
      days: [],
      day: 'Tuesday',
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
  
  
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
  
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(response => {
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({ ...state, appointments});
      })
  };
  
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
  
    return axios.delete(`/api/appointments/${id}`, appointment)
      .then((response) => {
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({ ...state, appointments});
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
