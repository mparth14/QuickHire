import express from 'express';
import { createService, getAllServices, getServiceById, updateService, deleteService, getServicesByPartialTitle } from '../../controllers/services.controller.js';

const router = express.Router();


router.post('/', createService);
router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.put('/:id', updateService);
router.delete('/:id', deleteService);
router.get('/search', getServicesByPartialTitle); // New route for searching by partial title

export default router;
