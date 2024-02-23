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
              pl: { xs: 1, sm: 2, md: 4, lg:37 },
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
                Is my personal information safe?
              </Typography>
              <Typography style={{ textAlign: 'left', fontFamily: font }}>
                We care about your privacy. Your information is safe with us.
              </Typography>
              <hr style={{ border: '1px solid lightgrey', margin: '20px 0' }} />
            </Box>
            <Box>
              <Typography
                variant='h6'
                sx={{ fontFamily: font, color: '#717478' }}
              >
                What is QuickHire?
              </Typography>
              <Typography style={{ textAlign: 'left', fontFamily: font }}>
                QuickHire is a platform where you can provide your services as 
                a freelancer. You can also search for an expert for your work
                and freelance them.
              </Typography>
              <hr style={{ border: '1px solid lightgrey', margin: '20px 0' }} />
            </Box>
            <Box>
              <Typography
                variant='h6'
                sx={{ fontFamily: font, color: '#717478' }}
              >
                What can I do on QuickHire?
              </Typography>
              <Typography style={{ textAlign: 'left', fontFamily: font }}>
                You can:
                <ul>
                  <li>- Search for an expert for your work</li>
                  <li>- Provide your skills to others in need</li>
                </ul>
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
