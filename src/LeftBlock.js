import React, { useState } from 'react';

const arrDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function LeftBlock({ date, handleToUpdate, handleToUpdateSubmit }) {
  const [toggle, setToggle] = useState(true);
  const [time, setTime] = useState("");
  const [event, setEvent] = useState("");

  const handleClick = () => {
    setToggle(!toggle);
    handleToUpdate(!toggle);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleToUpdateSubmit(time, event);
  };

  return (
    <div className="flip-container-left">
      <div className={`flipper ${toggle ? "" : "toggle"}`}>
        <div className="front front-left">
          <h2>Today</h2>
          <h1>{date.getDate()}</h1>
          <h2>{arrDays[date.getDay()]}</h2>
          <button className="btn btn-flip" onClick={handleClick}>
            +
          </button>
        </div>
        <div className="back back-left">
          <form onSubmit={handleSubmit}>
            <div className="container-event">
              <input
                type="text"
                className="input-time"
                maxLength="5"
                placeholder="12:00"
                onChange={(e) => setTime(e.target.value)}
              />
              <button className="btn btn-submit">→</button>
            </div>
            <input
              type="text"
              className="input-event"
              placeholder="Event"
              onChange={(e) => setEvent(e.target.value)}
            />
          </form>
          <button className="btn btn-flip" onClick={handleClick}>
            -
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeftBlock;
