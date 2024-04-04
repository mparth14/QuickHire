/**
 * Author: Parth Modi
 *
 * Component for the checkout page where users can view and manage their cart items and proceed to checkout.
 * This component displays the list of cart items, allows users to remove items, and initiates the checkout process.
 */

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
import { CONFIG } from '../../config';
import emptyCartImage from '../../assets/empty-cart.png';
import { useHistory } from 'react-router-dom';

const CheckoutPage = ({ user, onload }) => {
  const navigate = useHistory();
  const [token, setToken] = useState('');
  const stripePromise = loadStripe(
    'pk_test_51OpaEIEESxxIMUb2yF1IhG32GJV16TiGcwKKJnQgz4X726DbQscGQRRHqe5TzKoqftbBHxiQgrVPq6pebSNDfsaR00mrbuYE1E',
  );
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken && !user) {
      navigate.push('/login');
    } else {
      const fetchCartItems = async () => {
        try {
          const response = await fetch(CONFIG.BASE_PATH + `cart/${user._id}`);

          if (!response.ok) {
            throw new Error('Failed to fetch cart items');
          }
          const cartData = await response.json();
          setCartItems(cartData.services || []);
          setTotalCost(cartData.totalPrice || 0);
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      };

      fetchCartItems();
    }
  }, [onload, user, navigate]);

  if (!user) {
    return null;
  }

  /**
   * Handles the removal of a service from the cart.
   *
   * @param {string} serviceId - The ID of the service to be removed from the cart.
   */
  const handleRemoveItem = async (serviceId) => {
    try {
      const response = await fetch(CONFIG.BASE_PATH + 'cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
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

  /**
   * Handles the checkout process.
   */
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
      quantity: 1,
    }));

    try {
      const response = await fetch(
        CONFIG.BASE_PATH + 'create-checkout-session',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ items: cartItems }),
        },
      );

      const session = await response.json();
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
      <Typography variant='h3' align='center' gutterBottom color='primary'>
        Checkout
      </Typography>

      {cartItems.length === 0 && (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
        >
          <img
            src={emptyCartImage}
            alt='Empty Cart'
            style={{ width: '50%', maxWidth: '275px', marginTop: '5px' }}
            gutterBottom
          />
          <Typography variant='h6' align='center' gutterBottom>
            Uh oh! Your cart is empty. Select your favorite services and add
            them here.
          </Typography>
        </Box>
      )}

      <Grid container spacing={2}>
        {cartItems.map((service) => (
          <Grid item xs={12} key={service._id}>
            <Card>
              <Grid container>
                <Grid item xs={3}>
                  <CardMedia
                    component='img'
                    image={service.imgUrl}
                    alt={service.title}
                    style={{ height: 200, width: '100%', objectFit: 'cover' }}
                  />
                </Grid>
                <Grid item xs={9}>
                  <CardContent>
                    <Typography variant='h4' component='h2' gutterBottom>
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
                      variant='body1'
                      color='textSecondary'
                      gutterBottom
                    >
                      Offered by {service.sellerName}
                    </Typography>
                    <Typography
                      variant='body1'
                      color='textSecondary'
                      gutterBottom
                    >
                      Quantity: 1
                    </Typography>
                    <Typography
                      variant='body1'
                      color='textSecondary'
                      gutterBottom
                    >
                      Cost: ${service.price}
                    </Typography>
                    <div>
                      <IconButton
                        aria-label='delete'
                        style={{ color: 'red' }}
                        onClick={() => handleRemoveItem(service._id)}
                      >
                        <DeleteIcon />
                        <Typography variant='body1'>Remove Service</Typography>
                      </IconButton>
                    </div>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
      {totalCost > 0 && (
        <>
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
        </>
      )}
    </Container>
  );
};

export default CheckoutPage;
