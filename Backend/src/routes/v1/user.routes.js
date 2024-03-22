import express from 'express';
import { getAllUsers, getOneUser, updateUser, deleteUser } from '../../controllers/user.controller.js';
import { getUser, authenticate } from '../../middleware/auth.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser, getOneUser);
router.post('/:id', getUser, updateUser);
router.delete('/:id', getUser, deleteUser);

export default router;
