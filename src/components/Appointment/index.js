import React from 'react';

import './styles.scss';

import useVisualMode from '../../hooks/useVisualMode';

import Header from './header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';

const Appointment = ({id, time, interview}) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = 'CREATE';

  const { mode, transition, back } = useVisualMode( interview ? SHOW : EMPTY );


  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === SHOW && <Show {...interview}/>}
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}}/>}
      {mode === CREATE && <Form interviewers={[]} onCancel={() => {back()}} />}
    </article>
  )
};

export default Appointment;