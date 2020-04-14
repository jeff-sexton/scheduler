import React from 'react';

import DayListItem from './DayListItem';


export default function DayList({days, value, onChange}) {

  const dayList = days.map(item => {
    return <DayListItem 
      key={item.id}
      name={item.name}
      spots={item.spots}
      selected={item.name === value}
      onChange={() => onChange(item.name)}
    />

  })

  return (
    <ul>
      {dayList}
    </ul>
  )

};