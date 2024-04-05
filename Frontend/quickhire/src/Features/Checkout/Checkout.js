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
  Divider,
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
        // Update total cost
        const updatedTotalCost = cartItems
          .filter((item) => item._id !== serviceId)
          .reduce((total, item) => total + item.price, 0);
        setTotalCost(updatedTotalCost);
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
      const createOrderResponse = await fetch(
        CONFIG.BASE_PATH + 'orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({
            services: cartItems.map((item) => item._id),
            buyerId: user._id,
            totalPrice: totalCost,
          }),
        },
      );

      if (!createOrderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const response = await fetch(
        CONFIG.BASE_PATH + 'create-checkout-session',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ items: cartItems, userId: user._id }),
        },
      );
      const session = await response.json();

      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      // If redirection to Stripe checkout fails, log error
      if (result.error) {
        console.error(result.error.message);
        return;
      }
      
    } catch (error) {
      console.error('Error handling checkout:', error);
    }
  };

  return (
    <Container>
      <Typography
        variant='h2'
        align='center'
        gutterBottom
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 'bold',
          color: '#333',
          marginTop: '30px',
        }}
      >
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
            style={{ width: '50%', maxWidth: '300px', marginTop: '15px' }}
          />
          <Typography
            variant='h5'
            align='center'
            style={{
              color: '#333',
              marginTop: '20px',
              marginBottom: '20px',
              fontFamily: 'Arial, sans-serif',
              fontStyle: 'italic',
              fontWeight: 'normal',
              lineHeight: '1.5',
            }}
          >
            Oh no, your cart is empty! <br />
            Discover our delightful services and start adding your favorites.
          </Typography>
        </Box>
      )}

      {cartItems.length > 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {cartItems.map((service, index) => (
              <div key={service._id}>
                <Card>
                  <Grid container>
                    <Grid item xs={3}>
                      <CardMedia
                        component='img'
                        image={service.imgUrl}
                        alt={service.title}
                        style={{
                          height: '100%',
                          width: '100%',
                          objectFit: 'cover',
                          borderRadius: 8,
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <CardContent>
                        <Typography
                          variant='h4'
                          component='h2'
                          gutterBottom
                          style={{ fontWeight: 'bold', color: '#333' }}
                        >
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
                          Offered by{' '}
                          <span style={{ fontWeight: 'bold' }}>
                            {service.sellerName}
                          </span>
                        </Typography>
                        <Typography
                          variant='body1'
                          color='textSecondary'
                          gutterBottom
                          style={{ fontWeight: 'bold' }}
                        >
                          Cost: ${service.price}
                        </Typography>
                        <div>
                          <IconButton
                            aria-label='delete'
                            style={{ color: '#e74c3c' }}
                            onClick={() => handleRemoveItem(service._id)}
                          >
                            <DeleteIcon />
                            <Typography
                              variant='body1'
                              style={{ color: '#333' }}
                            >
                              Remove Service
                            </Typography>
                          </IconButton>
                        </div>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
                {index < cartItems.length - 1 && <Box mb={2} />}
              </div>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            {totalCost > 0 && (
              <>
                <Box mt={4} textAlign='center'>
                  <Typography
                    variant='h4'
                    gutterBottom
                    style={{ fontWeight: 'bold', color: '#333' }}
                  >
                    Total Cost: ${totalCost.toFixed(2)}
                  </Typography>
                  <Typography
                    variant='h5'
                    style={{ fontStyle: 'italic', color: '#666' }}
                  >
                    Place your order now!
                  </Typography>
                </Box>

                <Divider variant='middle' style={{ margin: '20px 0' }} />
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
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CheckoutPage;
