import {
  connectCategoryToOfferController,
  createCategoryController,
  createOfferController,
  deleteOfferController,
  getOffersFromStoreController,
  getResourceOffersController,
  getSingleOfferController,
  getStoreDataController,
  updateFeaturedOfferStatusController,
  updateShowcaseOfferStatusController
} from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { VerifiedTokenRequest } from '@/domain/models';
import { prisma } from '@/main/config';
import { Response, Router } from 'express';

/*eslint-disable @typescript-eslint/no-explicit-any*/
const resourcesRouter = Router();

type CreateSubcategoryBody = {
  name: string;
}

resourcesRouter.get('/offers/:store', getOffersFromStoreController.handle);

resourcesRouter.get('/store/:store', getStoreDataController.handle);

resourcesRouter.get('/:resourceId/offer/:offerId', getSingleOfferController.handle);

resourcesRouter.use(verifyToken);

resourcesRouter.post('/:resourceId/offer/create', createOfferController.handle);

resourcesRouter.delete('/offer/:id', deleteOfferController.handle);

resourcesRouter.put('/offer/:offerId/update/showcase', updateShowcaseOfferStatusController.handle);

resourcesRouter.put('/offer/:offerId/update/featured', updateFeaturedOfferStatusController.handle)

resourcesRouter.post('/:resourceId/category/create', createCategoryController.handle);

resourcesRouter.put('/:resourcesId/offer/:offerId/update/category', connectCategoryToOfferController.handle);

resourcesRouter.get('/:resourcesId/offers', getResourceOffersController.handle);

resourcesRouter.get('/:resourceId/categories', async (req: VerifiedTokenRequest, res: Response) => {
  const { resourceId } = req.params as { resourceId: string };
  try {
    const categories = await prisma.category.findMany({
      where: {
        resources_id: resourceId,
      },
      include: {
        sub_categories: true
      }
    })

    return res.status(200).json({
      status: 'success',
      message: 'Categorias encontradas',
      categories
    });
  } catch (error: any) {
    return res.status(400).json({
      status: 'error',
      error: error.message,
      message: 'Falha ao tentar criar uma nova categoria.'
    });
  }
});

resourcesRouter.post('/category/:categoryId/subcategory/create', async (req: VerifiedTokenRequest, res: Response) => {
  const { categoryId } = req.params as { categoryId: string };
  try {
    const body = req.body as CreateSubcategoryBody;

    const subcategory = await prisma.subCategory.create({
      data: {
        name: body.name,
        category_id: categoryId
      }
    })

    return res.status(201).json({
      status: 'success',
      message: 'Categoria criada com sucesso!',
      subcategory
    });

  } catch (error: any) {
    return res.status(400).json({
      status: 'error',
      error: error.message,
      message: 'Falha ao tentar criar uma nova subcategoria.'
    });
  }
})

export { resourcesRouter };
