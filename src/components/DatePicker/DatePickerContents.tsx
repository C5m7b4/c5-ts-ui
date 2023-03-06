import React, { useState, useEffect } from 'react';
import {
  getDateDetails,
  daysInMonth,
  isSameMonth,
  isSameDay,
  formatDate,
  addDays,
} from '../../utils';
import { daysOfWeek } from '../Calendar';
import './DatePicker.css';

const defaultState = {
  currentMonth: new Date(),
  selectedDate: new Date(),
};

export interface DatePickerContentProps {
  componentId: string;
  top: number;
  left: number;
  date?: Date;
  onDateClick: (d: Date) => void;
}

const DatePickerContents = (props: DatePickerContentProps) => {
  const { componentId, top, left, onDateClick } = props;

  const [selectedDate, setSelectedDate] = useState(defaultState.selectedDate);
  const [currentMonth, setCurrentMonth] = useState(
    props.date || defaultState.currentMonth
  );

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [currentMonth, selectedDate]);

  const handleDateClick = (d: Date) => {
    setSelectedDate(d);
    onDateClick(d);
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
            className={`c-day-container ${
              !isSameMonth(day, monthStart) ? 'disabled' : ''
            }`}
            key={`cd-${day}`}
            onClick={() => handleDateClick(clonedDate)}
          >
            <span
              className={`cdc-day ${
                isSameDay(day, selectedDate) ? 'highlighted-text' : ''
              }`}
            >
              {formattedDate}
            </span>
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
    return <div className="mpd-body">{rows}</div>;
  };

  const renderHeader = () => {
    return (
      <div className="header row flex-middle">
        <div className="mdp-button">
          <div className="mdp-head-button-inner" onClick={previousMonth}>
            <span className="mdp-head-button-left-arrow"></span>
          </div>
        </div>
        <div className="col col-center">
          <span id={`${componentId}-title`}>{formatDate(currentMonth)}</span>
        </div>
        <div className="mdp-button">
          <div className="mdp-head-button-inner" onClick={nextMonth}>
            <span className="mdp-head-button-right-arrow"></span>
          </div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days: JSX.Element[] = [];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="cch-name" key={`cd-${i}`}>
          {daysOfWeek[i].substring(0, 1)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
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
    <div
      className="mdp-container"
      style={{ position: 'absolute', top: `${top}px`, left: `${left}px` }}
    >
      <div id={componentId} className="mdp-content-container">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default DatePickerContents;
