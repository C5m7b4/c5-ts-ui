import React from 'react';

export type BackdropProps = {
  show: boolean;
  close: () => void;
  id: string;
};

const Backdrop = ({ show, close, id }: BackdropProps) => {
  const backdropStyle = {
    position: 'fixed',
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: show ? 'block' : 'none',
    background: 'rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
  } as React.CSSProperties;

  return (
    <div
      id={`${id}-backdrop`}
      style={backdropStyle}
      className={`${id}-backdrop`}
      onClick={() => close()}
    ></div>
  );
};

export default Backdrop;
