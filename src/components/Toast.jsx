// components/Toast.js
import React from 'react';

const Toast = ({ message, type, onClose }) => (
  <div 
    className={`position-fixed top-0 end-0 m-3 alert alert-${type} alert-dismissible`} 
    style={{ zIndex: 9999 }}
  >
    {message}
    <button type="button" className="btn-close" onClick={onClose}></button>
  </div>
);

export default Toast;