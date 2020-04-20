import React, { useState } from "react";

import InterviewerList from "../InterviewerList";
import Button from "../Button";

const Form = ({ name, interviewers, value, onSave, onCancel }) => {
  const [studentName, setStudentName] = useState(name || "");
  const [selectedInterviewer, setSelectedInterviewer] = useState(value || null);
  const [error, setError] = useState("");

  const validate = () => {
    if (studentName === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("")
    onSave(studentName, selectedInterviewer);
  };

  const reset = () => {
    setStudentName("");
    setSelectedInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
          <InterviewerList
            interviewers={interviewers}
            value={selectedInterviewer}
            onChange={setSelectedInterviewer}
          />
        </form>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={validate} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
