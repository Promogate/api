import { createOfferController } from '@/application/controllers';
import { verifyAPIKey, verifyToken } from '@/application/middlewares';
import { Router } from 'express';

const resourceRouter = Router();

resourceRouter.use(verifyToken);
resourceRouter.post('/offer/create', verifyAPIKey, createOfferController.handle);

export { resourceRouter };
