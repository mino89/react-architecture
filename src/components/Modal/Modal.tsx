import React, { useRef } from "react";
import { ModalProps } from "./_types";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

const Modal: React.FC<ModalProps> = (ModalProps) => {
  const { isOpen, onClose, children } = ModalProps;
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="fade"
      nodeRef={overlayRef}
      unmountOnExit
    >
      <div className="modal-overlay" onClick={onClose} ref={overlayRef}>
        <CSSTransition
          in={isOpen}
          timeout={300}
          classNames="slide-up"
          nodeRef={contentRef}
          unmountOnExit
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            ref={contentRef}
          >
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>
            {children}
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};

export default Modal;
