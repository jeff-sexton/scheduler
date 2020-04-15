import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";

import DayList from './DayList';
import Appointment from './Appointment';

// Mock data - replace with API call later
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Bacon the dog",
      interviewer: { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" }
    }
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Kevin Sitcrooked",
      interviewer: { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
    }
  },
];



export default function Application(props) {

  const [state, setState] = useState(
    {
      days: [],
      day: 'Tuesday',
      appointments: {}
    }
  );

  const setDay = day => setState({...state, day });
  const setDays = days => setState(prev => ({...prev, days }));

  useEffect(()=> {
    axios.get(`/api/days`)
      .then(response => {
        setDays(response.data);
      })
  },[]);


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
        {appointments.map(appointment => <Appointment key={appointment.id} {...appointment} />)}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
