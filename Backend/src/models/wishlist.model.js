/**
 * @Author Tijilkumar Parmar
 * Model for the Wishlist schema
 */
import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  wishlist: {
    type: [String],
    default: [],
  },
});

export default mongoose.model("Wishlist", wishlistSchema);
