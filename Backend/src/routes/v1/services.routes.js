import express from 'express';
import { createService, getAllServices, getServiceById, updateService, deleteService, getServicesByPartialHint } from '../../controllers/services.controller.js';

const router = express.Router();


router.get('/search', getServicesByPartialHint);
router.post('/', createService);
router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;
