import React from 'react';

import './styles.scss';

import Header from './header';
import Show from './Show';
import Empty from './Empty';

const Appointment = ({id, time, interview}) => {

  return (
    <article className="appointment">
      <Header time={time}/>
      {interview ? <Show {...interview}/> : <Empty />}
    </article>
  )
};

export default Appointment;