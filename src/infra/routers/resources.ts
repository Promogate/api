import {
  connectCategoryToOfferController,
  createCategoryController,
  createOfferController,
  createSubcategoryController,
  deleteOfferController,
  getOffersFromStoreController,
  getResourceCategoriesController,
  getResourceOffersController,
  getSingleOfferController,
  getStoreDataController,
  getStoresNamesController,
  updateFeaturedOfferStatusController,
  updateOfferController,
  updateShowcaseOfferStatusController
} from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { getStoresController } from '@/modules/social-soul/controllers';
import { Router } from 'express';

const resourcesRouter = Router();

resourcesRouter.get('/stores', getStoresNamesController.handle);

resourcesRouter.get('/offers/:store', getOffersFromStoreController.handle);

resourcesRouter.get('/store/:store', getStoreDataController.handle);

resourcesRouter.get('/:resourceId/offer/:offerId', getSingleOfferController.handle);

resourcesRouter.use(verifyToken);

resourcesRouter.get('/social-soul/stores', getStoresController.handle);

resourcesRouter.post('/:resourceId/offer/create', async (req, res) => await createOfferController.handle(req, res));

resourcesRouter.post('/category/:categoryId/subcategory/create', createSubcategoryController.handle);

resourcesRouter.post('/:resourceId/category/create', createCategoryController.handle);

resourcesRouter.get('/:resourcesId/offers', getResourceOffersController.handle);

resourcesRouter.get('/:resourceId/categories', getResourceCategoriesController.handle);

resourcesRouter.put('/:resourceId/offer/:offerId/update', updateOfferController.handle);

resourcesRouter.put('/offer/:offerId/update/showcase', updateShowcaseOfferStatusController.handle);

resourcesRouter.put('/offer/:offerId/update/featured', updateFeaturedOfferStatusController.handle);

resourcesRouter.put('/:resourcesId/offer/:offerId/update/category', connectCategoryToOfferController.handle);

resourcesRouter.delete('/offer/:id', deleteOfferController.handle);


export { resourcesRouter };
