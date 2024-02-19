// import React from 'react';
// import { Container, Typography } from '@mui/material';

// const SignUpSuccessMessage = () => {
//   return (
//     <Container maxWidth='sm' sx={{ marginTop: '64px' }}>
//       <div className='success-message-container'>
//         <div className='success-message-content'>
//           <Typography variant='h5' align='center' gutterBottom>
//             You have successfully signed up as a Seller. You can go ahead and
//             start adding your services.
//           </Typography>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default SignUpSuccessMessage;

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SignUpSuccessMessage = () => {
  return (
    <Container
      maxWidth='sm'
      sx={{
        marginTop: '64px',
        backgroundColor: 'darkgreen',
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        <CheckCircleOutlineIcon
          sx={{ fontSize: 64, color: '#FFFFFF', marginBottom: '20px' }}
        />
        <div className='success-message-container'>
          <div className='success-message-content'>
            <Typography
              variant='body1'
              align='center'
              sx={{ color: '#FFFFFF' }}
              gutterBottom
            >
              You have successfully signed up as a Seller. You can go ahead and
              start adding your services.
            </Typography>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default SignUpSuccessMessage;
