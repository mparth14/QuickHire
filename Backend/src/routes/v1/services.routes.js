import express from 'express';
import { createService, getAllServices, getServiceById, updateService, deleteService, getServicesByPartialHint } from '../../controllers/services.controller.js';
import { authenticate, isSeller } from '../../middleware/auth.js';

const router = express.Router();


router.get('/search', getServicesByPartialHint);
router.post('/',authenticate,isSeller,createService);
router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;
