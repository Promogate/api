import { createOfferController } from '@/application/controllers';
import { listOffersController } from '@/application/controllers/list-offers';
import { verifyAPIKey, verifyToken } from '@/application/middlewares';
import { Router } from 'express';

const resourceRouter = Router();

resourceRouter.use(verifyToken, verifyAPIKey);
resourceRouter.post('/offer/create', createOfferController.handle);
resourceRouter.get('/offers', listOffersController.handle);

export { resourceRouter };
