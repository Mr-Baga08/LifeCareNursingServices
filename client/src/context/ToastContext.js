// client/src/context/ToastContext.js
import React, { createContext, useContext, useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// Create context
const ToastContext = createContext();

// Toast provider component
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    title: '',
    message: '',
    type: 'info', // 'success', 'error', 'warning', 'info'
    duration: 6000,
    icon: <InfoOutlinedIcon fontSize="medium" />
  });

  // Show toast message
  const showToast = ({ title, message, type = 'info', duration = 6000 }) => {
    // Set icon based on type
    let icon;
    switch (type) {
      case 'success':
        icon = <CheckCircleOutlineIcon fontSize="medium" />;
        break;
      case 'error':
        icon = <ErrorOutlineIcon fontSize="medium" />;
        break;
      case 'warning':
        icon = <WarningAmberIcon fontSize="medium" />;
        break;
      case 'info':
      default:
        icon = <InfoOutlinedIcon fontSize="medium" />;
        break;
    }

    setToast({
      open: true,
      title,
      message,
      type,
      duration,
      icon
    });
  };

  // Close toast message
  const closeToast = () => {
    setToast((prev) => ({
      ...prev,
      open: false
    }));
  };

  return (
    <ToastContext.Provider value={{ toast, showToast, closeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};