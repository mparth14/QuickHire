/**
 * Author: Parth Modi
 *
 * Defines routes related to creating checkout sessions and handling webhooks for payments.
 * These routes handle operations such as creating checkout sessions and processing webhook events.
 */

import express from 'express';
const router = express.Router();
import Stripe from 'stripe';
import CartItem from '../../models/cart.model.js';

const stripe = Stripe(
  'sk_test_51OpaEIEESxxIMUb2qqXQpcSqLoxrYyCJKof5zYBFTCxiUnUtYcVofHdVhEJDbbXFtutZRd36XwbqSdbgtVET0N4W00vB933MHY',
);

/**
 * Route to create a Stripe Checkout session for payment.
 *
 * @param {object} req - The request object containing items to be purchased.
 * @param {object} res - The response object.
 */
router.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'cad',
      product_data: {
        name: item.title,
        images: [item.imgUrl],
      },
      unit_amount: item.price * 100,
    },
    quantity: 1,
  }));

  // Create a Stripe Checkout Session
  const baseUrl = req.headers.origin;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/payment-success`,
      cancel_url: `${baseUrl}/payment-failure`,
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Route to handle Stripe webhook events.
 *
 * @param {object} req - The request object containing the webhook event.
 * @param {object} res - The response object.
 */
router.post('/webhook', async (req, res) => {
  const event = req.body;

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await clearCartItems(session.customer);
    }

    res.status(200).send();
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Webhook Error');
  }
});

/**
 * Clear cart items associated with a user ID.
 * 
 * @param {string} userId - The ID of the user whose cart items are to be cleared.
 */
async function clearCartItems(userId) {
  try {
    // Find all cart items associated with the user ID
    const cartItems = await CartItem.find({ userId });

    // Remove all cart items found
    const deletionResult = await CartItem.deleteMany({ userId });
  } catch (error) {
    console.error('Error clearing cart items:', error);
    throw error; // Throw the error to handle it in the calling function
  }
}

export default router;
