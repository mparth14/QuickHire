import express from 'express';
const router = express.Router();
import Stripe from 'stripe';

const stripe = Stripe('sk_test_51OpaEIEESxxIMUb2qqXQpcSqLoxrYyCJKof5zYBFTCxiUnUtYcVofHdVhEJDbbXFtutZRd36XwbqSdbgtVET0N4W00vB933MHY');

router.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  // Create a list of line items for the Checkout Session
  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'cad',
      product_data: {
        name: item.title,
        images: [item.image],
      },
      unit_amount: item.cost * 100, // Stripe requires amount in cents
    },
    quantity: item.quantity,
  }));

  // Create a Stripe Checkout Session
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:4000/success', // Redirect after successful payment
      cancel_url: 'http://localhost:4000/cancel', // Redirect if payment is canceled
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
