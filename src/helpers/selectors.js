const getAppointmentsForDay = (state, targetDay) => {
  for (const day of state.days) {
    if (day.name === targetDay) {
      return day.appointments.map(
        (appointment) => state.appointments[appointment]
      );
    }
  }
  return [];
};

export { getAppointmentsForDay };

const getInterview = (state, interview) => {
  if (interview) {
    return {
      ...interview,
      interviewer: { ...state.interviewers[interview.interviewer] },
    };
  }

  return null;
};

export { getInterview };

const getInterviewersForDay = (state, targetDay) => {
  for (const day of state.days) {
    if (day.name === targetDay) {
      return day.interviewers.map(
        (interviewer) => state.interviewers[interviewer]
      );
    }
  }
  return [];
};

export { getInterviewersForDay };
