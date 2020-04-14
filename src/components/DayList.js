import React from 'react';

import DayListItem from './DayListItem';


export default function DayList({days, day, setDay}) {

  const dayList = days.map(dayElem => {
    return <DayListItem 
      key={dayElem.id}
      name={dayElem.name}
      spots={dayElem.spots}
      selected={dayElem.name === day}
      setDay={() => setDay(dayElem.name)}
    />

  })

  return (
    <ul>
      {dayList}
    </ul>
  )

};