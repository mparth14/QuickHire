/**
 * @author Hiteshkumar
 * @author Angel
 * Express router for managing category routes.
 * @type {express.Router}
 */
import express from 'express';
import * as categoryController from '../../controllers/categories.controller.js';

const router = express.Router();

/**
 * Route to retrieve all categories.
 * @name GET /api/categories/
 * @function
 */
router.get('/', categoryController.getAllCategories);

/**
 * Route to create a new category.
 * @name POST /api/categories/
 * @function
 */
router.post('/', categoryController.createCategory);

/**
 * Route to retrieve a category by ID.
 * @name GET /api/categories/:id
 * @function
 * @param {string} id - The ID of the category to retrieve.
 */
router.get('/:id', categoryController.getCategoryById);

export default router;
