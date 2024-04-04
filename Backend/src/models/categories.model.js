/**
 * @author Hiteshkumar
 * Defines the structure of a subcategory.
 * @typedef {object} Subcategory
 * @property {string} name - The name of the subcategory.
 * @property {string} url - The URL of the subcategory.
 * @property {string[]} services - An array of services offered in the subcategory.
 */

import mongoose from 'mongoose';
/**
 * Defines the schema for the Subcategory model.
 * @type {mongoose.Schema<Subcategory>}
 */

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  services: {
    type: [String],
    required: true
  }
});

/**
 * Defines the structure of a category.
 * @typedef {object} Category
 * @property {string} name - The name of the category.
 * @property {Subcategory[]} subcategories - An array of subcategories within the category.
 */

/**
 * Defines the schema for the Category model.
 * @type {mongoose.Schema<Category>}
 */
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subcategories: {
    type: [SubcategorySchema],
    required: true
  }
});

/**
 * Represents a Category model.
 * @type {mongoose.Model<Category>}
 */

const Category = mongoose.model('Category', CategorySchema);
 
export default Category;
 
