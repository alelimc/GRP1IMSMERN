import express from 'express';
import authRouter from './authRoute.js';
import userRouter from './userRoute.js';
import incidentRouter from './incidentRoute.js'
import adminRouter from './adminRoute.js'

const router = express.Router();

// Mount routers
router.use('/auth', authRouter);
router.use('/api/users', userRouter);
router.use('/api/incidents', incidentRouter)
router.use('/api/admin', adminRouter)

export default router;