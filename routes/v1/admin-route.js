import express from 'express';

import { isAdmin } from '../../middleware/check-admin.js';
import { getUsers,getEvents,deleteUser } from '../../controller/admin-controller.js';
import { authMiddleware } from '../../middleware/auth-middleware.js';

const router = express.Router();

router.get('/admin/users',authMiddleware,isAdmin,getUsers);
router.get('/admin/events',authMiddleware,isAdmin,getEvents);
router.delete('/admin/users/:id',authMiddleware,isAdmin,deleteUser);

export default router;
