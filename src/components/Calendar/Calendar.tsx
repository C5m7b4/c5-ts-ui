import React, { useState, useEffect } from 'react';
import {
  getDateDetails,
  daysInMonth,
  isSameMonth,
  isSameDay,
  formatDate,
  addDays,
} from '../../utils';

import './Calendar.css';

export const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const defaultState = {
  currentMonth: new Date(),
  selectedDate: new Date(),
};

export interface CalendarProps {
  onChange: (d: Date) => void;
  date?: Date;
}

const Calendar = (props: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState(defaultState.selectedDate);
  const [currentMonth, setCurrentMonth] = useState(
    props.date || defaultState.currentMonth
  );

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [currentMonth, selectedDate]);

  const renderHeader = () => {
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="calendar-icon prev" onClick={previousMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{formatDate(currentMonth)}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="calendar-icon next">chevron_right</div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days: JSX.Element[] = [];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={`cd-${i}`}>
          {daysOfWeek[i]}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const { month, year } = getDateDetails(currentMonth);
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month, daysInMonth(month, year));
    const d = monthStart.getDay();
    const startDate = addDays(monthStart, -d);
    const endDate = addDays(monthEnd, 7 - d);

    const rows: JSX.Element[] = [];
    let days: JSX.Element[] = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = day.getDate().toString();
        const clonedDate = day;
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? 'disabled'
                : isSameDay(day, selectedDate)
                ? 'selected'
                : ''
            }`}
            key={`cd-${day}`}
            onClick={() => onDateClick(clonedDate)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={`cd-row-${day}`}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const onDateClick = (day: Date) => {
    if (props.onChange) {
      props.onChange(day);
    }
    setSelectedDate(day);
  };

  const nextMonth = () => {
    let month = currentMonth.getMonth() + 1;
    let year = currentMonth.getFullYear();
    const day = currentMonth.getDate();
    if (month === 12) {
      year++;
      month = 1;
    } else {
      month++;
    }
    const newDate = new Date(
      month.toString() + '/' + day.toString() + '/' + year.toString()
    );
    setCurrentMonth(newDate);
  };

  const previousMonth = () => {
    let month = currentMonth.getMonth() + 1;
    let year = currentMonth.getFullYear();
    const day = currentMonth.getDate();
    if (month === 1) {
      year--;
      month = 12;
    } else {
      month--;
    }
    const newDate = new Date(
      month.toString() + '/' + day.toString() + '/' + year.toString()
    );
    setCurrentMonth(newDate);
  };

  return (
    <div className="c5-calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
