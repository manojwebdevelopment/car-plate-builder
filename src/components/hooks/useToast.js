// hooks/useToast.js
import { useState } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'danger') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const hideToast = () => {
    setToast(null);
  };

  return {
    toast,
    showToast,
    hideToast
  };
};