import React from "react";
import PropTypes from "prop-types";

import "./InterviewerList.scss";

import InterviewerListItem from "../InterviewerListItem";

const InterviewerList = ({ interviewers, value, onChange }) => {
  const interviewersList = interviewers.map((item) => {
    return (
      <InterviewerListItem
        key={item.id}
        name={item.name}
        avatar={item.avatar}
        selected={item.id === value}
        onChange={() => onChange(item.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersList}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default InterviewerList;
