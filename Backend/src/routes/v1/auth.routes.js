/**
 * @authors 
 * Rahul Hambarde
 */
import express from 'express';
import { login, register, forgotPassword, changePassword, validateToken } from '../../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/change-password/:user_id/:token', changePassword);
router.get('/validate-token/:user_id/:token', validateToken);

export default router;