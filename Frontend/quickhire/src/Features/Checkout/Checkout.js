// Author: Parth Modi

import React, { useState, useEffect } from 'react';
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

const CheckoutPage = () => {
  const stripePromise = loadStripe(
    'pk_test_51OpaEIEESxxIMUb2yF1IhG32GJV16TiGcwKKJnQgz4X726DbQscGQRRHqe5TzKoqftbBHxiQgrVPq6pebSNDfsaR00mrbuYE1E',
  );

  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/cart/660423ed59de39016941dcd2`,
        );
        const cartData = await response.json();
        setCartItems(cartData.services);
        setTotalCost(cartData.totalPrice);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (serviceId) => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '660423ed59de39016941dcd2',
          serviceId: serviceId,
        }),
      });
      if (response.ok) {
        // Remove the item from the cartItems state
        setCartItems((prevItems) =>
          prevItems.filter((item) => item._id !== serviceId),
        );
      } else {
        console.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // Prepare line items with quantity 1 for each service
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: 'cad',
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: 1, // Quantity is always 1
    }));

    // Call your backend to create a Stripe Checkout Session
    try {
      const response = await fetch(
        'http://localhost:4000/api/v1/create-checkout-session',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ items: cartItems }), // Send line items instead of cartItems
        },
      );

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <Container>
      <Typography variant='h2' align='center' gutterBottom>
        Checkout
      </Typography>
      <Grid container spacing={2}>
        {cartItems.map((service) => (
          <Grid item xs={12} key={service._id}>
            <Card>
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
                      Cost: ${service.price}
                    </Typography>
                    <IconButton
                      aria-label='delete'
                      style={{ color: 'red' }}
                      onClick={() => handleRemoveItem(service._id)}
                    >
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
          Total Cost: ${totalCost.toFixed(2)}
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
