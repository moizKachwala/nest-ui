import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from '../common';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const showToast = useCallback((message, severity = 'info') => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  }, []);

  const handleClose = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, handleClose }}>
      {children}
      {/* Toast component is now integrated here */}
      <Toast open={open} handleClose={handleClose} message={message} severity={severity} />
    </ToastContext.Provider>
  );
};
