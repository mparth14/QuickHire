import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const FailurePage = () => {
  return (
    <Container>
      <Box display='flex' flexDirection='column' alignItems='center' mt={5}>
        <HighlightOffIcon sx={{ fontSize: 80, color: 'red' }} />
        <Typography variant='h4' align='center' gutterBottom>
          Payment Failed
        </Typography>
        <Typography variant='body1' align='center'>
          We're sorry, but there was an issue processing your payment. Please
          try again later.
        </Typography>
      </Box>
    </Container>
  );
};

export default FailurePage;
