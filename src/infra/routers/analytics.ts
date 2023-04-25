import { getOffersClicksController } from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { Router } from 'express';

const analyticsRouter = Router();

analyticsRouter.use(verifyToken);
analyticsRouter.get('/clicks', getOffersClicksController.handle);

export { analyticsRouter };
