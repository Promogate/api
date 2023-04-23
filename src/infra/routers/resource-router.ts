import {
  createOfferController,
  findOfferByIdController,
  listOffersController
} from '@/application/controllers';
import { verifyAPIKey, verifyToken } from '@/application/middlewares';
import { Router } from 'express';

const resourceRouter = Router();

resourceRouter.use(verifyToken, verifyAPIKey);
resourceRouter.post('/offer/create', createOfferController.handle);
resourceRouter.get('/offers', listOffersController.handle);
resourceRouter.get('/offers/:id', findOfferByIdController.handle);

export { resourceRouter };
