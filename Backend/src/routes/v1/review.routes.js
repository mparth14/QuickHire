/**
 * @Author Tijilkumar Parmar
 * Route set for the APIs related to the rating service
 */
import express from "express";
import {
  addReview,
  getReviewsByServiceID,
} from "../../controllers/review.controller.js";

const router = express.Router();

router.get("/", getReviewsByServiceID);
router.post("/", addReview);

export default router;
