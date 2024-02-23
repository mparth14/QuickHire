import React from 'react';
import { Typography, Container, Box } from '@mui/material';

function FAQPage() {
  const font =
    'Helvetica Neue LT, Helvetica Neue, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif';

  return (
    <Box sx={{ overflow: 'auto' }}>
      <>
        <Box
          sx={{
            backgroundColor: '#717478',
            py: { xs: 6, md: 12 },
            px: { xs: 2, sm: 4, md: 6 },
            textAlign: 'left',
            color: 'white',
            marginBottom: '20px',
          }}
        >
          <Typography
            sx={{
              fontFamily: font,
              fontWeight: '700',
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.4rem' },
              maxWidth: '800px',
              pl: { xs: 2, sm: 4, md: 12 },
            }}
            variant='h3'
          >
            Frequently Asked Questions
          </Typography>
        </Box>
        <Container maxWidth='md'>
          <Box sx={{ overflowY: 'auto', marginBottom: '20px' }}>
            <Box>
              <Typography
                variant='h6'
                sx={{ fontFamily: font, color: '#717478' }}
              >
                What is Lorem Ipsum?
              </Typography>
              <Typography style={{ textAlign: 'left', fontFamily: font }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                malesuada faucibus ex nec ultricies. Donec mattis egestas nisi
                non pretium. Suspendisse nec eros ut erat facilisis maximus. In
                congue et leo in varius. Vestibulum sit amet felis ornare,
                commodo orci ut, feugiat lorem.
              </Typography>
              <hr style={{ border: '1px solid lightgrey', margin: '20px 0' }} />
            </Box>
            <Box>
              <Typography
                variant='h6'
                sx={{ fontFamily: font, color: '#717478' }}
              >
                What is Lorem Ipsum?
              </Typography>
              <Typography style={{ textAlign: 'left', fontFamily: font }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                malesuada faucibus ex nec ultricies. Donec mattis egestas nisi
                non pretium. Suspendisse nec eros ut erat facilisis maximus. In
                congue et leo in varius. Vestibulum sit amet felis ornare,
                commodo orci ut, feugiat lorem.
              </Typography>
              <hr style={{ border: '1px solid lightgrey', margin: '20px 0' }} />
            </Box>
            <Box>
              <Typography
                variant='h6'
                sx={{ fontFamily: font, color: '#717478' }}
              >
                What is Lorem Ipsum?
              </Typography>
              <Typography style={{ textAlign: 'left', fontFamily: font }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                malesuada faucibus ex nec ultricies. Donec mattis egestas nisi
                non pretium. Suspendisse nec eros ut erat facilisis maximus. In
                congue et leo in varius. Vestibulum sit amet felis ornare,
                commodo orci ut, feugiat lorem.
              </Typography>
              <hr style={{ border: '1px solid lightgrey', margin: '20px 0' }} />
            </Box>
          </Box>
        </Container>
      </>
    </Box>
  );
}

export default FAQPage;
