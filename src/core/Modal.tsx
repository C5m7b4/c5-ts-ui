import React from 'react';
import Backdrop from './Backdrop';
import ModalWrapper from './ModalWrapper';

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode | React.ReactNode[];
  id: string;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children, id }) => {
  return (
    <>
      <Backdrop show={show} close={onClose} id={id} />
      <ModalWrapper className="color-picker-modal-wrapper" show={show}>
        {children}
      </ModalWrapper>
    </>
  );
};

export default Modal;
