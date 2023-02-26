import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { CalendarEvent } from '../Calendar';
import { formatDate } from '../../../utils';

import './EventViewer.css';

export interface EventListProps {
  show: boolean;
  hide: () => void;
  events: CalendarEvent[];
}

const EventList = (props: EventListProps) => {
  const [showExtraInfo, setShowExtraInfo] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<CalendarEvent | null>(null);
  const div = document.getElementById('modal-placeholder');

  const handleClick = (e: CalendarEvent) => {
    setShowExtraInfo(true);
    setCurrentEvent(e);
  };

  if (props.show && div) {
    return createPortal(
      <div className="calendar-modal">
        <div className="overlay" onClick={props.hide} />
        <div className="wrapper" tabIndex={-1}>
          <div className="event-list">
            <div className="modal-header">
              <span className="title">Event List</span>
              <span className="close-box">
                <button
                  type="button"
                  className="close-button"
                  onClick={props.hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </span>
            </div>
            <div className="body">
              <div className="contents">
                <div>
                  {props.events &&
                    props.events.map((event, idx) => {
                      return (
                        <div
                          key={`eli-${idx}`}
                          className="event-list-item"
                          onClick={() => handleClick(event)}
                          data-testid={`el-e-${idx}`}
                        >
                          <span>{event.title}</span>
                        </div>
                      );
                    })}
                </div>
                <div></div>
              </div>
              <div className="extra-info">
                {showExtraInfo && currentEvent && (
                  <div className="extra-info-details">
                    <div className="ei-title">{currentEvent.title}</div>
                    <div className="date">{formatDate(currentEvent.date)}</div>
                    <div className="times">
                      <span>Start: {currentEvent.start}</span>
                      <span>End: {currentEvent.end}</span>
                    </div>
                    <div>
                      <textarea
                        value={currentEvent.description}
                        cols={10}
                        rows={8}
                        readOnly={true}
                      />
                    </div>
                  </div>
                )}
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

export default EventList;
