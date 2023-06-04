import { verifyToken } from '@/application/middlewares';
import { getCouponsController, getStoresController } from '@/modules/social-soul/controllers';
import { Router } from 'express';

const socialsoulRouter = Router();

socialsoulRouter.use(verifyToken);

socialsoulRouter.get('/coupons', getCouponsController.handle);

socialsoulRouter.get('/stores', getStoresController.handle);

export { socialsoulRouter };
