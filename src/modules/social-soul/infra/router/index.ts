import { verifyToken } from '@/application/middlewares';
import { getCouponsController } from '@/modules/social-soul/controllers';
import { Router } from 'express';

const socialsoulRouter = Router();

socialsoulRouter.use(verifyToken);

socialsoulRouter.get('/coupons', getCouponsController.handle);

export { socialsoulRouter };
