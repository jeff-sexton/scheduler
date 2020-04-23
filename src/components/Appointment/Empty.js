import React from "react";

const Empty = ({ onAdd }) => {
  return (
    <main className="appointment__add" onClick={onAdd}>
      <img className="appointment__add-button" src="images/add.png" alt="Add" />
    </main>
  );
};

export default Empty;
