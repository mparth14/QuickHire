import express from 'express';
import { getAllUsers, getOneUser, updateUser, deleteUser } from '../../controllers/user.controller.js';
import { getUser, authenticate } from '../../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getAllUsers);
router.get('/:id', authenticate, getUser, getOneUser);
router.post('/:id', authenticate, getUser, updateUser);
router.delete('/:id', authenticate, getUser, deleteUser);

export default router;
