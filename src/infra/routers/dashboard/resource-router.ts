import {
  createOfferController,
  findOfferByIdController,
  listOffersController
} from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { Router } from 'express';

const dashboardResourceRouter = Router();

dashboardResourceRouter.use(verifyToken);
dashboardResourceRouter.post('/offer/create', createOfferController.handle);
dashboardResourceRouter.get('/offers', listOffersController.handle);
dashboardResourceRouter.get('/offers/:id', findOfferByIdController.handle);

export { dashboardResourceRouter };
