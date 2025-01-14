import express from 'express';
import { createEvent,getEvents,getEvent,updateEvent,deleteEvent,registerEvent,cancelRegistration,getEventAttendees } from '../../controller/event-controller.js';
import { authMiddleware } from '../../middleware/auth-middleware.js';



const router = express.Router();

router.post('/events',authMiddleware,createEvent);
router.get('/events',getEvents);
router.get('/events/:id',getEvent);
router.put('/events/:id',authMiddleware,updateEvent);
router.delete('/events/:id',authMiddleware,deleteEvent);

router.post('/events/:id/register',authMiddleware,registerEvent);
router.delete('/events/:id/register',authMiddleware,cancelRegistration);
router.get('/events/:id/attendees',authMiddleware,getEventAttendees);

export default router;
