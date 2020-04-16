import React, { useState } from 'react';

import './styles.scss';

import useVisualMode from '../../hooks/useVisualMode';

import Header from './header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

const Appointment = ({id, time, interview, interviewers, bookInterview, cancelInterview}) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode( interview ? SHOW : EMPTY );

  const [ errorMsg, setErrorMessage ] = useState('');

  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };

    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(err => {
        setErrorMessage(err.message);
        transition(ERROR_SAVE, true);
      });
  };

  const deleteInterview = () => {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(err => {
        setErrorMessage(err.message);
        transition(ERROR_DELETE, true);
      });
  };


  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === SHOW && <Show {...interview} onDelete={() => {transition(CONFIRM)}} onEdit={() => {transition(EDIT)}}/>}
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}}/>}
      {mode === CREATE && <Form interviewers={interviewers} onSave={save} onCancel={() => {back()}} />}
      {mode === EDIT && <Form name={interview.student} value={interview.interviewer.id} interviewers={interviewers} onSave={save} onCancel={() => {back()}} />}
      {mode === SAVING && <Status message='Saving' />}
      {mode === CONFIRM && <Confirm message='Are you sure you would like to delete?' onConfirm={deleteInterview} onCancel={() => {back()}} />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === ERROR_SAVE && <Error message={`Something Went Wrong Saving: ${errorMsg}`} onClose={() => {back()}} />}
      {mode === ERROR_DELETE && <Error message={`Something Went Wrong Deleting: ${errorMsg}`} onClose={() => {back()}} />}
    </article>
  )
};

export default Appointment;