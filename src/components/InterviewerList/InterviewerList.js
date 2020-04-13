import React from 'react';

import './InterviewerList.scss';

import InterviewerListItem from './InterviewerListItem';



const InterviewerList = ({interviewers, interviewer, setInterviewer}) => {
  const interviewersList = interviewers.map(interviewerElem => {
    return <InterviewerListItem 
      key={interviewerElem.id}
      avatar={interviewerElem.avatar}
      selected={interviewerElem.id === interviewer}
      setInterviewer={() => setInterviewer(interviewerElem.id)}
    />
  });


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
          {interviewersList}
        </ul>
    </section>
  )
};

export default InterviewerList;