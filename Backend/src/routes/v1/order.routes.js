/**
 * @author Yashkumar Khorja
 * Express router for managing order routes.
 * @type {express.Router}
 */
import express from "express";
import {
  createServiceOrder,
  getAllOrdersForCurrentUser,
  getServiceOrderByUserId,
} from "../../controllers/order.controller.js";
import { authenticate } from "../../middleware/auth.js";

const router = express.Router();

/**
 * Route to get all received orders for the logged-in user.
 * @name GET /api/orders
 * @function
 * @param {Function} middleware - Express middleware function to authenticate the user
 */
router.get("/", authenticate, getAllOrdersForCurrentUser);

/**
 * Route to create a new service order.
 * @name POST /api/orders
 * @function
 * @param {Function} middleware - Express middleware function to authenticate the user
 */
router.post("/", authenticate, createServiceOrder);

/**
 * Route to get service orders by user ID.
 * @name GET /api/orders/:userId
 * @function
 * @param {Function} middleware - Express middleware function to authenticate the user
 */
router.get("/:userId", authenticate, getServiceOrderByUserId);

export default router;
