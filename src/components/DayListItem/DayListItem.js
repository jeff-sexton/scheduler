import React from "react";
import "./DayListItem.scss";

import classNames from "classnames";
const DayListItem = ({ name, spots, selected, onChange }) => {
  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": selected,
    "day-list__item--full": spots <= 0,
  });

  const formatSpots = (numOfSpots) => {
    let spotsString = "";
    if (numOfSpots <= 0) {
      spotsString = "no spots remaining";
    } else if (numOfSpots === 1) {
      spotsString = `${spots} spot remaining`;
    } else {
      spotsString = `${spots} spots remaining`;
    }

    return spotsString;
    // return spots <= 0 ? 'no spots remaining' : spots === 1 ? `${spots} spot remaining` : `${spots} spots remaining`
  };

  return (
    <li data-testid="day" className={dayClass} onClick={onChange}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
};

export default DayListItem;
