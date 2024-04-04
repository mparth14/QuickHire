/**
 * Author: Parth Modi
 *
 * Defines routes related to the user's shopping cart.
 * These routes handle operations such as adding, retrieving, and removing items from the cart.
 */

import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../../controllers/cart.controller.js";
import { authenticate } from "../../middleware/auth.js";

const router = express.Router();

router.post("/add", authenticate, addToCart);
router.get("/:userId", getCart);
router.post("/remove", removeFromCart);

export default router;
