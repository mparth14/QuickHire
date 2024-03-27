import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SuccessPage = () => {
  return (
    <Container>
      <Box display='flex' flexDirection='column' alignItems='center' mt={5}>
        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'green' }} />
        <Typography variant='h4' align='center' gutterBottom>
          Payment Successful
        </Typography>
        <Typography variant='body1' align='center'>
          Thank you for your purchase. Your payment has been successfully
          processed.
        </Typography>
      </Box>
    </Container>
  );
};

export default SuccessPage;
