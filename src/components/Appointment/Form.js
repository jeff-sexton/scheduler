import React, { useState } from 'react';

import InterviewerList from '../InterviewerList';
import Button from '../Button';

const Form = ({name, interviewers, value, onSave, onCancel}) => {
  const [studentName, setStudentName] = useState(name || '');
  const [selectedInterviewer, setSelectedInterviewer] = useState(value || null)

  const reset = () => {
    setStudentName('');
    setSelectedInterviewer(null);
  }
  
  const cancel = () => {
    reset();
    onCancel();
  };

  const save = () => {
    onSave(studentName, selectedInterviewer)
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off"
          onSubmit={event => event.preventDefault()}>
            <input
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              value= {studentName}
              onChange={event => setStudentName(event.target.value)}
              placeholder="Enter Student Name"
            />
        </form>
        <InterviewerList interviewers={interviewers} value={selectedInterviewer} onChange={setSelectedInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={save} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
};

export default Form;