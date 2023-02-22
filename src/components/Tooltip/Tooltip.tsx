import React, { useState, useRef, useEffect } from 'react';
import './Tooltip.css';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export type TooltipTheme = 'light' | 'dark';

export interface TooltipProps {
  position?: TooltipPosition;
  children: React.ReactNode;
  message: string;
  style?: React.CSSProperties;
  theme?: TooltipTheme;
  messageStyle?: React.CSSProperties;
}

const Tooltip = (props: TooltipProps) => {
  const [displayTooltip, setDisplayTooltip] = useState(false);
  const { position = 'top', theme = 'dark' } = props;

  let internalStyle = {
    backgroundColor: '#fff',
    color: '#000',
    padding: '5px',
  } as React.CSSProperties;

  if (props.theme === 'dark') {
    internalStyle = {
      backgroundColor: '#000',
      color: '#fff',
      padding: '5px',
    } as React.CSSProperties;
  }

  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.style) {
      internalStyle = props.style;
    }
  }, []);

  const showTooltip = () => {
    setDisplayTooltip(true);
  };

  const hideTooltip = () => {
    setDisplayTooltip(false);
  };

  return (
    <span
      className="mcl-tooltip-wrapper"
      ref={tooltipRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {displayTooltip ? (
        <div className={`mcl-tooltip-bubble mcl-tooltip-${position} ${theme}`}>
          <div
            className="mcl-tooltip-message"
            style={{ ...internalStyle, ...props.messageStyle }}
          >
            {props.message}
          </div>
        </div>
      ) : null}
      <span ref={triggerRef} className="mcl-tooltip-trigger">
        {props.children}
      </span>
    </span>
  );
};

export default Tooltip;
