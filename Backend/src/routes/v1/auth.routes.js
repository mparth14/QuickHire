import express from 'express';
import { login, register, forgotPassword, changePassword } from '../../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/change-password/:user_id/:token', changePassword);

export default router;