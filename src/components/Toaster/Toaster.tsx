import React, { useContext } from 'react';
import './Toaster.css'; // Add your styles here
import { ToastContext } from './ToastContext';

const Toaster: React.FC = () => {
  const { toasts, removeToast } = useContext(ToastContext);

  return (
    <div className="toaster">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <span>{toast.message}</span>
          <button onClick={() => removeToast(toast.id)}>&times;</button>
        </div>
      ))}
    </div>
  );
};

export default Toaster;