import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../../core';
import DatePickerContents from './DatePickerContents';

import './DatePicker.css';

export interface DatePickerProps {
  date: Date;
  onChange: (d: Date) => void;
  id?: string;
}

const DatePicker = (props: DatePickerProps) => {
  const [defaultDate, setDefaultDate] = useState(props.date);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const componentId = props.id ? `c5-dp-${props.id}` : 'c5-dp-1';

  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInput();
  }, [defaultDate]);

  const convertToDateFormat = (input: string) => {
    const d = new Date(input);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    const year = d.getFullYear().toString();
    if (month.length === 1) {
      month = '0' + month;
    }
    if (day.length === 1) {
      day = '0' + day;
    }
    return year.toString() + '-' + month + '-' + day;
  };

  const setInput = () => {
    /* istanbul ignore else */
    if (dateRef.current) {
      const dateString = convertToDateFormat(new Date(defaultDate).toString());
      dateRef.current.value = dateString;
    }
  };

  const handleDateClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    /* istanbul ignore else */
    if (dateRef.current) {
      const rect = dateRef.current.getBoundingClientRect();
      setTop(event.clientY - window.innerHeight / 2 + rect.height);
    }
    setLeft(event.clientX - window.innerWidth / 2 - 150);
    setShowDatePicker(true);
  };

  const onDateClick = (day: Date) => {
    setDefaultDate(day);
    /* istanbul ignore else */
    if (props.onChange) {
      props.onChange(day);
    }
    setShowDatePicker(false);
    handleClose();
  };

  const handleClose = () => {
    setShowDatePicker(false);
  };

  return (
    <div id="c5-date-picker" className="c5-date-picker">
      <div className="c5-dp-input" onClick={handleDateClick} id={componentId}>
        <input type="date" ref={dateRef} />
      </div>

      <Modal show={showDatePicker} onClose={handleClose} id={componentId}>
        <DatePickerContents
          top={top}
          left={left}
          date={defaultDate}
          componentId={componentId}
          onDateClick={onDateClick}
        />
      </Modal>
    </div>
  );
};

export default DatePicker;
