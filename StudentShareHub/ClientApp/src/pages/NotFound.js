import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '5rem' }}>
            404
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: '2rem' }}>
            Oops! Page not found.
          </Typography>
          <Typography variant="body1" sx={{ marginTop: '2rem' }}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary" size="large" sx={{ marginTop: '2rem' }}>
            Back to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
