import React, { useContext } from "react";
import "./Toaster.css"; // Add your styles here
import { ToastContext } from "./ToastContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Toaster: React.FC = () => {
  const { toasts, removeToast } = useContext(ToastContext);
  return (
    <TransitionGroup className="toaster">
      {toasts.map(({ id, nodeRef, message, type }) => (
        <CSSTransition
          nodeRef={nodeRef}
          key={id}
          timeout={300}
          classNames="slide-up"
        >
          {
            <div className={`toast ${type}`} ref={nodeRef}>
              <span>{message}</span>
              <button onClick={() => removeToast(id)}>&times;</button>
            </div>
          }
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default Toaster;
