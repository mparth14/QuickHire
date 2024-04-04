import express from "express";
import {
  createServiceOrder,
  getAllOrders,
  getServiceOrderByBuyerId,
  getServiceOrderBySellerId,
} from "../../controllers/order.controller.js";
import { authenticate } from "../../middleware/auth.js";

const router = express.Router();
router.get("/", getAllOrders);

router.post("/", authenticate, createServiceOrder);

router.get("/buyer/:userId", authenticate, getServiceOrderByBuyerId);

router.get("/seller/:userId", authenticate, getServiceOrderBySellerId);

export default router;
