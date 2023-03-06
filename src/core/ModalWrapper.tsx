import React from 'react';

export type ModalWrapperProps = {
  show: boolean;
  children: React.ReactNode;
  className?: string;
};

const ModalWrapper = ({ show, children, className }: ModalWrapperProps) => {
  const modalWrapperStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    zIndex: 2,
    transform: 'translate(-50%, -50%)',
    transformOrigin: 'left top',
    maxWidth: '100%',
    height: 'auto',
    display: show ? 'block' : 'none',
    animation: 'color-picker-fade-in .5s ease',
  } as React.CSSProperties;

  return (
    <div className={className} style={modalWrapperStyle}>
      {children}
    </div>
  );
};

export default ModalWrapper;
