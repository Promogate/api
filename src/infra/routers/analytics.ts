import { getProfileController, redirectController } from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { Router } from 'express';

const analyticsRouter = Router();

analyticsRouter.get('/redirect/offer/:id', async (req, res) => await redirectController.handle(req, res));

analyticsRouter.use(verifyToken);
analyticsRouter.get('/profile/:id', getProfileController.handle);

export { analyticsRouter };
