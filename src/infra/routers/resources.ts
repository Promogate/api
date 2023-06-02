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
  updateFeaturedOfferStatusController,
  updateOfferController,
  updateShortlinkController,
  updateShowcaseOfferStatusController
} from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { Router } from 'express';

const resourcesRouter = Router();

resourcesRouter.get('/offers/:store', getOffersFromStoreController.handle);

resourcesRouter.get('/store/:store', getStoreDataController.handle);

resourcesRouter.get('/:resourceId/offer/:offerId', getSingleOfferController.handle);

resourcesRouter.use(verifyToken);

resourcesRouter.post('/:resourceId/offer/create', createOfferController.handle);

resourcesRouter.post('/category/:categoryId/subcategory/create', createSubcategoryController.handle);

resourcesRouter.post('/:resourceId/category/create', createCategoryController.handle);

resourcesRouter.get('/:resourcesId/offers', getResourceOffersController.handle);

resourcesRouter.get('/:resourceId/categories', getResourceCategoriesController.handle);

resourcesRouter.put('/:resourceId/offer/:offerId/update', updateOfferController.handle);

resourcesRouter.put('/offer/:offerId/shortlink', updateShortlinkController.handle);

resourcesRouter.put('/offer/:offerId/update/showcase', updateShowcaseOfferStatusController.handle);

resourcesRouter.put('/offer/:offerId/update/featured', updateFeaturedOfferStatusController.handle);

resourcesRouter.put('/:resourcesId/offer/:offerId/update/category', connectCategoryToOfferController.handle);

resourcesRouter.delete('/offer/:id', deleteOfferController.handle);


export { resourcesRouter };
