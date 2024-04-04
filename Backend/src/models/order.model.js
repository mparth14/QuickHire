import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    service_id: {
      type: String,
      required: true,
    },
    buyer_id: {
      type: String,
      required: true,
    },
    seller_id: {
      type: String,
      required: true,
    },
    payment_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
