import {
  createOfferController,
  findOfferByIdController,
  listOffersController
} from '@/application/controllers';
import { verifyAPIKey } from '@/application/middlewares';
import { Router } from 'express';

const resourceRouter = Router();

resourceRouter.use(verifyAPIKey);
resourceRouter.post('/offer/create', createOfferController.handle);
resourceRouter.get('/offers', listOffersController.handle);
resourceRouter.get('/offers/:id', findOfferByIdController.handle);

export { resourceRouter };
