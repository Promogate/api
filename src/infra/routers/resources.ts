import { getShowcaseOffersController } from '@/application/controllers';
import { Router } from 'express';

const resourcesRouter = Router();

resourcesRouter.get('/offers/:store', getShowcaseOffersController.handle);

export { resourcesRouter };
