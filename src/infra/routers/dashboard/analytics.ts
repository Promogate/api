import { getOffersClicksController } from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { Router } from 'express';

const analyticsRouter = Router();

analyticsRouter.use(verifyToken);
analyticsRouter.get('/clicks', getOffersClicksController.handle);
analyticsRouter.get('/offers');

export { analyticsRouter };
