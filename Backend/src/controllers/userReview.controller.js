/**
 * @Author Tijilkumar Parmar
 * Controller for all the interactions regarding the rating dialog.
 */
import Review from "../models/userReview.model.js";

// Controller function to add a review
const addReview = async (req, res) => {
  try {
    const { serviceID, rating, review, userId, createdAt, reviewerId } =
      req.body;
    console.log(rating);
    const newReview = new Review({
      serviceID,
      rating,
      review,
      userId,
      createdAt,
      reviewerId,
    });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to fetch all reviews for a particular service ID
const getReviewsByUserID = async (req, res) => {
  try {
    const { id } = req.query;
    const reviews = await Review.find({ userId: id });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addReview, getReviewsByUserID };
