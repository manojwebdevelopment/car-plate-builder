// src/components/Toast.jsx - Simple toast component if you don't have one

import React, { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, duration = 5000 }) => {
  
  useEffect(() => {
    if (message) {
      const duration = message.length > 50 ? 5000 : 3000; // 5 seconds for long messages, 3 for short
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  const getToastClass = () => {
    switch (type) {
      case 'success':
        return 'bg-success text-white';
      case 'error':
        return 'bg-danger text-white';
      case 'warning':
        return 'bg-warning text-dark';
      case 'info':
      default:
        return 'bg-info text-white';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'bi-check-circle';
      case 'error':
        return 'bi-exclamation-triangle';
      case 'warning':
        return 'bi-exclamation-circle';
      case 'info':
      default:
        return 'bi-info-circle';
    }
  };

  return (
    <div 
      className="position-fixed top-0 end-0 p-3" 
      style={{ zIndex: 9999 }}
    >
      <div 
        className={`toast show ${getToastClass()}`} 
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
      >
        <div className="toast-header">
          <i className={`bi ${getIcon()} me-2`}></i>
          <strong className="me-auto">
            {type === 'success' ? 'Success' : 
             type === 'error' ? 'Error' : 
             type === 'warning' ? 'Warning' : 'Info'}
          </strong>
          <button 
            type="button" 
            className="btn-close btn-close-white" 
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">
          {message}
        </div>
      </div>
    </div>
  );
};

export default Toast;