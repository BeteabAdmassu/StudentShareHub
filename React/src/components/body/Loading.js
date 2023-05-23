import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const Loading = () => {
  const backdropStyle = {
    zIndex: 9999,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const progressStyle = {
    margin: 'auto',
    color: '#fff',

  };

  return (
    <Backdrop open={true} style={backdropStyle}>
      <CircularProgress style={progressStyle} />
    </Backdrop>
  );
};

export default Loading;