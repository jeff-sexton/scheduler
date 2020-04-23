import React from "react";
import classNames from "classnames";

import "./InterviewerListItem.scss";

const InterviewerListItem = ({ name, avatar, selected, onChange }) => {
  const interviewerClass = classNames({
    interviewers__item: true,
    "interviewers__item--selected": selected,
  });

  return (
    <li className={interviewerClass} onClick={onChange}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;
