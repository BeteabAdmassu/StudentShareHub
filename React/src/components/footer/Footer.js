import { Container, Typography } from '@mui/material';

export default function Footer() {
  return (
    <footer>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 4 }}>
          &copy; {new Date().getFullYear()} Company Name. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
}
