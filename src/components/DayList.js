import React from 'react';

import DayListItem from './DayListItem';


export default function DayList({days, day, setDay}) {

  const dayList = days.map(dayElem => {
    return <DayListItem 
      key={dayElem.id}
      name={dayElem.name}
      spots={dayElem.spots}
      selected={dayElem.name === day}
      setDay={setDay}
    />

  })

  return (
    <ul>
      {dayList}
    </ul>
  )

};