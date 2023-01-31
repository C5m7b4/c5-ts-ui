import React, { useState } from 'react';

import './Button.css';

export type NormalButtonType =
  | 'normal'
  | 'green'
  | 'purple'
  | 'danger'
  | 'info'
  | 'success'
  | 'error';

export type NormalButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  label: string;
  style?: React.CSSProperties;
  onClick?: () => React.MouseEvent<HTMLButtonElement>;
  disabled?: boolean;
  type?: NormalButtonType;
  size?: NormalButtonSize;
}

const Button = (props: ButtonProps) => {
  const [hover, setHover] = useState(false);

  const {
    label,
    style,
    onClick,
    disabled = false,
    type,
    size = 'small',
  } = props;

  let buttonStyle = {};

  switch (type) {
    case 'normal':
      buttonStyle = {
        backgroundColor: hover ? '#877b87' : '',
        color: hover ? '#fff' : '#000',
      };
      break;
    case 'green':
      buttonStyle = {
        backgroundColor: hover ? '#2ea62e' : 'limegreen',
        color: '#fff',
      };
      break;
    case 'purple':
      buttonStyle = {
        backgroundColor: hover ? '#9c229c' : '#ba1eba',
        color: '#fff',
      };
      break;
    case 'danger':
      buttonStyle = {
        backgroundColor: hover ? '#c9a734' : '#e8bb25',
        color: '#fff',
      };
      break;
    case 'info':
      buttonStyle = {
        backgroundColor: hover ? '#5680a8' : '#5a95cd',
        color: '#fff',
      };
      break;
    case 'success':
      buttonStyle = {
        backgroundColor: hover ? 'rgb(35 169 71)' : '#1bcc4a',
        color: '#fff',
      };
      break;
    case 'error':
      buttonStyle = {
        backgroundColor: hover ? '#bf2424' : 'red',
        color: '#fff',
      };
      break;
    default:
    // do nothing;
  }

  buttonStyle = {
    ...buttonStyle,
    transition: 'background-color .3s ease, color .3s ease',
  };

  const toggleHover = () => {
    setHover(!hover);
  };

  return (
    <button
      onClick={onClick}
      style={{ ...style, ...buttonStyle }}
      disabled={disabled}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      className={`c5-normal-button c5-normal-button-${size}`}
    >
      {label}
    </button>
  );
};

export { Button };
