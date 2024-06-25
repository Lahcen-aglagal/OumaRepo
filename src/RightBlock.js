import React, { useState, useEffect } from 'react';

const arrMonth = {
  January: 31,
  February: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31
};

const arrDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function RightBlock({ date, eventList, toggle, handleToUpdateDate, handleToggle }) {
  const [firstDay, setFirstDay] = useState(new Date(`${date.getFullYear()}-${date.getMonth() + 1}-01`).getDay());
  const [selectedYear, setSelectedYear] = useState(date.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(date.getMonth());
  const [selectedDay, setSelectedDay] = useState(date.getDate());

  useEffect(() => {
    setFirstDay(new Date(`${selectedYear}-${selectedMonth + 1}-01`).getDay());
  }, [selectedYear, selectedMonth]);

  const updateMonth = (event) => {
    const newMonth = Object.keys(arrMonth).indexOf(event.target.value);
    handleToUpdateDate(`${selectedDay}/${newMonth}/${selectedYear}`);
    setSelectedMonth(newMonth);
  };

  const prevMonth = () => {
    if (selectedMonth - 1 < 0) {
      handleToUpdateDate(`${selectedDay}/11/${selectedYear - 1}`);
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      handleToUpdateDate(`${selectedDay}/${selectedMonth - 1}/${selectedYear}`);
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth + 1 > 11) {
      handleToUpdateDate(`${selectedDay}/0/${selectedYear + 1}`);
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      handleToUpdateDate(`${selectedDay}/${selectedMonth + 1}/${selectedYear}`);
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const updateYear = (event) => {
    const year = parseInt(event.target.value);
    if (event.target.value.length === 4) {
      handleToUpdateDate(`${selectedDay}/${selectedMonth}/${year}`);
      setSelectedYear(year);
    }
  };

  const handleClick = (event) => {
    const day = parseInt(event.currentTarget.dataset.id);
    handleToUpdateDate(`${day}/${selectedMonth}/${selectedYear}`);
    setSelectedDay(day);
  };

  const getDayBlocks = () => {
    const days = [];
    for (let n = 0; n < firstDay; n++) {
      days.push(<div className="day-block" key={`empty-${n}`} />);
    }
    for (let i = 1; i <= arrMonth[Object.keys(arrMonth)[selectedMonth]]; i++) {
      days.push(
        <div
          data-id={i}
          onClick={handleClick}
          className={`day-block ${i === selectedDay ? "active" : ""}`}
          key={i}
        >
          <div className="inner">{i}</div>
        </div>
      );
    }
    return days;
  };

  const getEvents = () => {
    return eventList
      .filter(event => {
        const [day, month, year] = event[0].split('/');
        return (
          parseInt(day) === selectedDay &&
          parseInt(month) === selectedMonth &&
          parseInt(year) === selectedYear
        );
      })
      .map((event, index) => (
        <div className="event" key={index}>
          <p className="event-time">{event[1]}</p>
          <p className="event-name">{event[2]}</p>
        </div>
      ));
  };

  const monthOptions = Object.keys(arrMonth).map(month => (
    <option
      className="option-month"
      value={month}
      key={month}
      selected={month === Object.keys(arrMonth)[selectedMonth]}
    >
      {month}
    </option>
  ));

  return (
    <div className="flip-container-right">
      <div className={`flipper ${toggle ? "" : "toggle"}`}>
        <div className="front front-right">
          <div className="container-date-picker">
            <button className="btn btn-prev" onClick={prevMonth}>
              &lt;
            </button>
            <select className="select-month" onChange={updateMonth}>
              {monthOptions}
            </select>
            <input
              type="text"
              className="input-year"
              onChange={updateYear}
              value={selectedYear}
              maxLength="4"
            />
            <button className="btn btn-next" onClick={nextMonth}>
              &gt;
            </button>
          </div>
          <div className="container-day">
            {arrDays.map(day => (
              <div className="weekday" key={day}>{day.substring(0, 3)}</div>
            ))}
            {getDayBlocks()}
          </div>
        </div>
        <div className="back back-right">
          <h2>Events on {arrDays[date.getDay()]}</h2>
          <div className="container-event-list">
            {getEvents()}
          </div>
          <button className="btn btn-flip" onClick={handleToggle}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default RightBlock;
