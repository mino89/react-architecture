import React from 'react';
import './Modal.css'; // Import CSS for styling
import { ModalProps } from './types';



const Modal: React.FC<ModalProps> = (ModalProps) => {
  const { isOpen, onClose, children } = ModalProps;
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;