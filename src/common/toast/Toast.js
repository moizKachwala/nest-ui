import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

// Create an Alert component based on MuiAlert for accessibility
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} sx={{
    fontWeight: 'bold',
    '.MuiAlert-icon': {
      fontSize: '30px', // Larger icon
    },
    borderRadius: '8px', // Rounded corners
    boxShadow: '0px 0px 12px rgba(0,0,0,0.2)', // Soft shadow for depth
    // Add animation for extra fun
    '@keyframes shake': {
      '0%': { transform: 'translateX(0)' },
      '20%': { transform: 'translateX(-10px)' },
      '40%': { transform: 'translateX(10px)' },
      '60%': { transform: 'translateX(-10px)' },
      '80%': { transform: 'translateX(10px)' },
      '100%': { transform: 'translateX(0)' },
    },
    animation: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
    transformOrigin: 'center center',
  }} />;
});

const Toast = ({ open, handleClose, message, severity = "info" }) => {
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={6000} 
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position the toast at the top right
      TransitionComponent={Slide} // Add sliding effect
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;