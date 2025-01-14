import express from 'express';

import { loginUser, registerUser, getUser, updateUser } from '../../controller/user-controller.js';
import { authMiddleware } from '../../middleware/auth-middleware.js';

const router = express.Router();

router.post('/users/login', loginUser);
router.post('/users/register', registerUser);
router.get('/users/:id',authMiddleware, getUser);
router.put('/users/:id',authMiddleware, updateUser);

export default router;
