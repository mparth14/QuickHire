/**
 * @Author Tijilkumar Parmar
 * Model for the Review schema
 */
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  serviceID: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model("Review", reviewSchema);
