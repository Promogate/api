import { getOffersClicksController, getOffersWithClicksCountController } from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { Router } from 'express';

const analyticsRouter = Router();

analyticsRouter.use(verifyToken);
analyticsRouter.get('/clicks', getOffersClicksController.handle);
analyticsRouter.get('/offers');
analyticsRouter.get('/offers/clicks', getOffersWithClicksCountController.handle);

export { analyticsRouter };
