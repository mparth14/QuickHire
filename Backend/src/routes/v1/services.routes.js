/**
 * @author Hiteshkumar
 * @author Angel
 * @author Yashkumar
 * Express router for managing service routes.
 * @type {express.Router}
 */
import express from 'express';
import { createService, getAllServices, getServiceById, updateService, deleteService, getServicesByPartialHint,getAllServicesIncludingDisabled } from '../../controllers/services.controller.js';
import { authenticate, isSeller } from '../../middleware/auth.js';

const router = express.Router();

/**
 * Route to search services by partial hint.
 * @name GET /api/services/search
 * @function
 */
router.get("/search", getServicesByPartialHint);

/**
 * Route to create a new service.
 * @name POST /api/services/
 * @function
 */
router.post("/", authenticate, isSeller, createService);

/**
 * Route to retrieve all services.
 * @name GET /api/services/
 * @function
 */
router.get("/", getAllServices);

/**
 * Route to retrieve all services including disabled services for that Id.
 * @name GET /api/services/all
 * @function
 */
router.get('/all',authenticate, getAllServicesIncludingDisabled);

/**
 * Route to retrieve a service by ID.
 * @name GET /api/services/:id
 * @function
 * @param {string} id - The ID of the service to retrieve.
 */
router.get("/:id", getServiceById);

/**
 * Route to update a service by ID.
 * @name PUT /api/services/:id
 * @function
 * @param {string} id - The ID of the service to update.
 */
router.put('/:id',authenticate,isSeller, updateService);

/**
 * Route to delete a service by ID.
 * @name DELETE /api/services/:id
 * @function
 * @param {string} id - The ID of the service to delete.
 */
router.delete("/:id", deleteService);

export default router;
