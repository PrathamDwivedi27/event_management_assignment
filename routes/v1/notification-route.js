import express from 'express';
import sendEventNotifications from '../../controller/notification-controller.js';


const router = express.Router();

router.post('/notifications/send',sendEventNotifications);

export default router;
