// Author: Parth Modi

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
