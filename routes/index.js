import { Router } from "express";
import userRoutes from "./v1/user-route.js"
import eventRoutes from "./v1/event-route.js"
import adminRoutes from "./v1/admin-route.js"

const router= Router();

router.use("/v1",userRoutes);
router.use("/v1",eventRoutes)
router.use("/v1",adminRoutes)

export default router;