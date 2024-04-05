/**
 * @author Yashkumar Khorja
 * Defines the schema for the Order model.
 * @typedef {Object} OrderSchema
 * @property {Schema.Types.ObjectId[]} services - Array of service IDs associated with the order.
 * @property {string} buyerId - ID of the buyer who placed the order.
 * @property {number} totalPrice - Total price of the order.
 * @property {Date} createdAt - Date when the order was created.
 * @property {Date} updatedAt - Date when the order was last updated.
 */

import mongoose from "mongoose";

const { Schema } = mongoose;
/**
 * Defines the schema for the Service model.
 * @type {mongoose.Schema<Service>}
 */
const orderSchema = new Schema(
  {
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service", // Reference to the Service model
      },
    ],
    buyerId: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt timestamps
);

export default mongoose.model("Order", orderSchema);
