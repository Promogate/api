import {
  getShowcaseOffersController,
  getStoreDataController
} from '@/application/controllers';
import { Router } from 'express';

const resourcesRouter = Router();

resourcesRouter.get('/offers/:store', getShowcaseOffersController.handle);
resourcesRouter.get('/store/:store', getStoreDataController.handle);

export { resourcesRouter };
