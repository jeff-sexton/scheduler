import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';

import DayList from './DayList';
import Appointment from './Appointment';

export default function Application(props) {

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
  
  const dayAppointments = getAppointmentsForDay(state, state.day);
  const dayInterviewers = getInterviewersForDay(state, state.day);

  const appointmentsArr = dayAppointments.map(appointment => {

    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
        interview={interview}
        interviewers={dayInterviewers}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsArr}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
