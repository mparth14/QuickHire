/**
 * @Author Tijilkumar Parmar
 * Route set for the APIs related to the wishlist page
 */
import express from "express";
import {
  getUserWishlistWithServiceDetails,
  addToWishlist,
  removeFromWishlist,
} from "../../controllers/wishlist.controller.js";

const router = express.Router();

router.get("/", getUserWishlistWithServiceDetails);
router.post("/", addToWishlist);
router.delete("/", removeFromWishlist);

export default router;
