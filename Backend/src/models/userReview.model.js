/**
 * @Author Tijilkumar Parmar
 * Model for the User Review schema
 */
import mongoose from "mongoose";

const userReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
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
  reviewerId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("UserReview", userReviewSchema);
