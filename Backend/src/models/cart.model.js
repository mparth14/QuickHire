/**
 * Author: Parth Modi
 *
 * Defines the schema for the user's shopping cart.
 * This schema is used to store information about the user's cart,
 * including the user ID, services added to the cart, and total price.
 */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Service',
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('Cart', cartSchema);
