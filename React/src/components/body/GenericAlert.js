import React from 'react';
import { Alert } from '@mui/material';

const GenericAlert = ({ severity, message, position }) => {
  const alertStyle = {
    position: 'fixed',
    ...position,
    zIndex: '9999',
  };

  return (
    <Alert sx={alertStyle} severity={severity}>
      {message}
    </Alert>
  );
};

export default GenericAlert;