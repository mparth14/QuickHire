import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { loadStripe } from '@stripe/stripe-js';

const services = [
  {
    id: 1,
    image:
      'https://i.natgeofe.com/n/966983d4-7aab-4b12-89d1-03f108866cb2/NationalGeographic_303235_4x3.jpg',
    title: 'Photography Session',
    description:
      "Capture your special moments with our professional photography services. Whether it's a wedding, portrait, or event, Niko Bellic will ensure your memories are preserved beautifully.",
    provider: 'Niko Bellic',
    quantity: 1,
    cost: 128,
  },
  {
    id: 2,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtmWb_q5MHwRxMP1eEnBZLDtIcjKzL0IuZoA&usqp=CAU',
    title: 'Programming Course',
    description:
      'Learn programming from scratch with our comprehensive programming courses. From beginner to advanced topics, master coding skills and build your own projects.',
    provider: 'Boris Kuznetsov',
    quantity: 1,
    cost: 99,
  },
];

const CheckoutPage = () => {
  const stripePromise = loadStripe(
    'pk_test_51OpaEIEESxxIMUb2yF1IhG32GJV16TiGcwKKJnQgz4X726DbQscGQRRHqe5TzKoqftbBHxiQgrVPq6pebSNDfsaR00mrbuYE1E',
  );

  // Initialize total cost to 0
  let totalCost = 0;

  // Loop through each service and add its cost to the totalCost
  for (const service of services) {
    totalCost += service.cost;
  }
  const cardStyle = {
    transition: 'transform 0.3s ease',
  };

  const handleHover = (event) => {
    event.currentTarget.style.transform = 'scale(1.05)';
  };

  const handleHoverEnd = (event) => {
    event.currentTarget.style.transform = 'scale(1)';
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // Call your backend to create a Stripe Checkout Session
    const response = await fetch('http://localhost:4000/api/v1/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: services }),
    });

    const session = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <Container>
      <Typography variant='h2' align='center' gutterBottom>
        Checkout
      </Typography>
      <Grid container spacing={2}>
        {services.map((service) => (
          <Grid item xs={12} key={service.id}>
            <Card
              style={cardStyle}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverEnd}
            >
              <Grid container>
                <Grid item xs={3}>
                  <CardMedia
                    component='img'
                    image={service.image}
                    alt={service.title}
                    style={{ height: 200, width: '100%', objectFit: 'cover' }}
                  />
                </Grid>
                <Grid item xs={9}>
                  <CardContent>
                    <Typography variant='h6' component='h2' gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography
                      variant='body1'
                      color='textSecondary'
                      gutterBottom
                    >
                      {service.description}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      gutterBottom
                    >
                      Offered by {service.provider}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      gutterBottom
                    >
                      Quantity: {service.quantity}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      gutterBottom
                    >
                      Cost: ${service.cost}
                    </Typography>
                    <IconButton aria-label='delete' style={{ color: 'red' }}>
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={4} display='flex' justifyContent='flex-end'>
        <Typography variant='h6'>
          Total Cost: ${services.reduce((acc, curr) => acc + curr.cost, 0)}
        </Typography>
      </Box>
      <Box mt={4} display='flex' justifyContent='center'>
        <Button
          onClick={handleCheckout}
          variant='contained'
          color='primary'
          size='large'
        >
          Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
