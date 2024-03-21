import express from 'express';
import { getAllServices, getServicesByPartialTitle } from '../../controllers/service.controller.js';

const router = express.Router();

router.get('/', getAllServices);
router.get('/search', getServicesByPartialTitle); // New route for searching by partial title

export default router;
