import express from 'express';
import { getEventStats, getPopularEvents,getActiveUsers } from '../../controller/event-controller.js';



const router = express.Router();

router.get('/analytics/events/popular',getPopularEvents);
router.get('/analytics/users/active',getActiveUsers);
router.get('/analytics/events/:id/stats',getEventStats);

export default router;
