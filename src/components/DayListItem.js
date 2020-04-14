import React from "react";
import './DayListItem.scss';

import classNames from 'classnames';

export default function DayListItem({name, spots, selected, setDay}) {
  const dayClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': selected,
    'day-list__item--full': spots <= 0
  });

  const formatSpots = (numOfSpots) => {
    let spotsString = '';
    if (numOfSpots <= 0) {
      spotsString = 'no spots remaining';
      
    } else if (numOfSpots === 1) {
      spotsString = `${spots} spot remaining`;
      
    } else {
      spotsString = `${spots} spots remaining`;
    }
    
    return spotsString;
    // spots <= 0 ? 'no spots remaining' : spots === 1 ? `${spots} spot remaining` : `${spots} spots remaining`
  }
  
  return (
    <li 
      className={dayClass}
      onClick={setDay}>
        <h2 className="text--regular">{name}</h2> 
        <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}