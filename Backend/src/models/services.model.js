/**
 * @author Hiteshkumar
 * @author Angel
 * @author Yashkumar
 * Represents the structure of a service.
 * @typedef {object} Service
 * @property {string} title - The title of the service.
 * @property {string} description - The description of the service.
 * @property {string} category - The category of the service.
 * @property {string} [subCategory] - The subcategory of the service (optional).
 * @property {number} price - The price of the service.
 * @property {Date} [createdDate] - The date when the service was created (optional).
 * @property {Date} [updatedDate] - The date when the service was last updated (optional).
 * @property {boolean} [isActive] - Indicates whether the service is active or not (optional).
 * @property {string} sellerId - The ID of the seller.
 * @property {string} [imgUrl] - The URL of the image associated with the service (optional).
 * @property {number} [currentRating] - The current rating of the service (optional).
 * @property {number} [numberOfRatings] - The number of ratings received for the service (optional).
 * @property {boolean} [isPopular] - Indicates whether the service is popular or not (optional).
 */

import mongoose from "mongoose";

const { Schema } = mongoose;
/**
 * Defines the schema for the Service model.
 * @type {mongoose.Schema<Service>}
 */
const serviceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: [120, "Description must be at least 120 characters"],
    maxlength: [1500, "Description cannot exceed 1500 characters"],
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: String,
  price: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return /^[0-9]+$/.test(value);
      },
      message: "Price must be a number",
    },
  },
  sellerName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  sellerId: {
    type: String,
    required: true,
  },
  imgUrl: String,
  currentRating: { type: Number, default: 0 },
  numberOfRatings: { type: Number, default: 0 },
  isPopular: { type: Boolean, default: false },
});

export default mongoose.model("Service", serviceSchema);
