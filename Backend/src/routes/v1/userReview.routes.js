/**
 * @Author Tijilkumar Parmar
 * Route set for the APIs related to the rating user
 */
import express from "express";
import {
  addReview,
  getReviewsByUserID,
} from "../../controllers/userReview.controller.js";

const router = express.Router();

router.get("/", getReviewsByUserID);
router.post("/", addReview);

export default router;
