import {
  createCategoryController,
  createOfferController,
  deleteOfferController,
  getOffersFromStoreController,
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

resourcesRouter.put('/:resourcesId/offer/:offerId/update/category/:categoryId', async (req: VerifiedTokenRequest, res: Response) => {
  const { resourcesId } = req.params as { resourcesId: string };

  const body = req.body as  { categoryId: string, offerId: string };

  try {
    const offer = await prisma.categoriesOnOffer.create({
      data: {
        resource_id: resourcesId,
        offer_id: body.offerId,
        category_id: body.categoryId,
      }
    });

    return res.status(200).json({
      status: 'success',
      message: 'Categoria adicionada com sucesso à oferta',
      offer
    });

  } catch (error: any) {
    return res.status(400).json({
      status: 'error',
      error: error.message,
      message: 'Algo deu errado ao tentar atualizar a oferta'
    })
  }
});

resourcesRouter.get('/:resourcesId/offers', async (req: VerifiedTokenRequest, res: Response) => {
  const { resourcesId } = req.params as { resourcesId: string };
  try {
    const offers = await prisma.offer.findMany({
      where: {
        resources_id: resourcesId,
      }, include: {
        categories: {
          select: {
            category: {
              include: {
                sub_categories: true
              }
            }
          }
        }
      }
    })

    return res.status(200).json({
      status: 'success',
      message: 'Ofertas encontradas',
      offers
    });
  } catch (error: any) {
    return res.status(400).json({
      status: 'error',
      error: error.message,
      message: 'Algo deu errado ao tentar atualizar a oferta'
    })
  }
});

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
