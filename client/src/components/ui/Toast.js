import React, { createContext, useContext, useState } from 'react';
import { 
  Snackbar, 
  Alert, 
  AlertTitle, 
  Typography,
  IconButton,
  Box 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
    duration: 6000
  });

  // Show toast message
  const showToast = ({ title, message, type = 'info', duration = 6000 }) => {
    setToast({
      open: true,
      title,
      message,
      type,
      duration
    });
  };

  // Close toast message
  const closeToast = () => {
    setToast((prev) => ({
      ...prev,
      open: false
    }));
  };

  // Get icon based on toast type
  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleOutlineIcon fontSize="medium" />;
      case 'error':
        return <ErrorOutlineIcon fontSize="medium" />;
      case 'warning':
        return <WarningAmberIcon fontSize="medium" />;
      case 'info':
      default:
        return <InfoOutlinedIcon fontSize="medium" />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={toast.duration}
        onClose={closeToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ 
          mt: 7,
          '& .MuiPaper-root': {
            borderRadius: 2,
            minWidth: { xs: '100%', sm: 350 },
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <Alert 
          severity={toast.type}
          variant="filled"
          onClose={closeToast}
          sx={{ 
            width: '100%',
            alignItems: 'flex-start',
            '.MuiAlert-icon': {
              display: 'none', // Hide default icon
            }
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={closeToast}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Box sx={{ color: 'white' }}>
              {getToastIcon(toast.type)}
            </Box>
            <Box>
              <AlertTitle 
                sx={{ 
                  fontWeight: 600,
                  mb: 0.5,
                  color: 'white' 
                }}
              >
                {toast.title}
              </AlertTitle>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.5
                }}
              >
                {toast.message}
              </Typography>
            </Box>
          </Box>
        </Alert>
      </Snackbar>
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