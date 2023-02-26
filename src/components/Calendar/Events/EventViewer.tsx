import React from 'react';
import { createPortal } from 'react-dom';
import { CalendarEvent } from '../Calendar';
import { formatDate } from '../../../utils';
import { OutlineButton } from '../../OutlineButton';

import './EventViewer.css';

export interface EventViewerProps {
  show: boolean;
  hide: () => void;
  event: CalendarEvent | null;
  handleClick: (e: CalendarEvent | null) => void;
}

const EventViewer = (props: EventViewerProps) => {
  const handleClick = (e: CalendarEvent) => {
    props.handleClick(e);
  };

  const div = document.getElementById('modal-placeholder');

  if (props.show && div && props.event) {
    return createPortal(
      <div className="calendar-modal">
        <div className="overlay" onClick={props.hide} />
        <div className="wrapper" tabIndex={-1}>
          <div className="event">
            <div className="modal-header">
              <span className="title">{props.event.title}</span>
              <span className="close-box">
                <button
                  type="button"
                  className="close-button"
                  onClick={props.hide}
                >
                  <span aria-hidden={true}>&times;</span>
                </button>
              </span>
            </div>
            <div className="body">
              <div className="date">Date: {formatDate(props.event.date)}</div>
              <div className="times">
                <span className="start">Start: {props.event.start}</span>
                <span className="start">End: {props.event.end}</span>
              </div>
              <textarea
                cols={10}
                rows={8}
                readOnly={true}
                value={props.event.description}
              />
              <div className="buttons">
                <OutlineButton
                  type="warning"
                  text="Cancel"
                  onClick={props.hide}
                />
                <OutlineButton
                  type="success"
                  text="OK"
                  onClick={() => handleClick(props.event as CalendarEvent)}
                  style={{ marginLeft: '10px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>,
      div
    );
  } else {
    return null;
  }
};

export default EventViewer;
