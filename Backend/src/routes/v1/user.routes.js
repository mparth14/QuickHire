import express from 'express';
import { getUser, getAllUsers, getOneUser, createUser, updateUser, deleteUser } from '../../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser, getOneUser);
router.post('/', createUser);
router.patch('/:id', getUser, updateUser);
router.delete('/:id', getUser, deleteUser);

export default router;
