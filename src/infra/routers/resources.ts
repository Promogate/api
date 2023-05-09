import {
  getShowcaseOffersController,
  getStoreDataController
} from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { VerifiedTokenRequest } from '@/domain/models';
import { prisma } from '@/main/config';
import { Response, Router } from 'express';

const resourcesRouter = Router();

type CreateOfferBody = {
  image: string;
  title: string;
  old_price: string | null;
  price: string;
  destination_link: string;
  store_image: string | null;
  store_name: string;
  description: string | null;
  expiration_date: string | null;
  is_featured: boolean | undefined;
  is_free_shipping: boolean | undefined;
}

type CreateCategoryBody = {
  name: string;
}

type CreateSubcategoryBody = {
  name: string;
}

resourcesRouter.get('/offers/:store', getShowcaseOffersController.handle);
resourcesRouter.get('/store/:store', getStoreDataController.handle);

resourcesRouter.use(verifyToken);

resourcesRouter.post('/:resourceId/offer/create', async (req: VerifiedTokenRequest, res: Response) => {
  const { resourceId } = req.params as { resourceId: string };
  try {

    const body = req.body as CreateOfferBody;

    const offer = await prisma.offer.create({
      data: {
        image: body.image,
        title: body.title,
        destination_link: body.destination_link,
        price: body.price,
        store_name: body.store_name,
        store_image: body.store_image,
        is_featured: body.is_featured,
        is_free_shipping: body.is_free_shipping,
        expiration_date: body.expiration_date,
        resources: {
          connect: {
            id: resourceId
          }
        }
      }
    })

    return res.status(201).json({
      status: 'success',
      message: 'Oferta criada com sucesso!',
      offer
    })

  } catch (err: any) {
    return res.status(400).json({
      status: 'error',
      error: err.message,
      message: 'Algo deu erro ao tentar criar uma nova oferta'
    })
  }

});

resourcesRouter.post('/:resourceId/category/create', async (req: VerifiedTokenRequest, res: Response) => {
  const { resourceId } = req.params as { resourceId: string };
  try {

    const body = req.body as CreateCategoryBody;
    const category = await prisma.category.create({
      data: {
        name: body.name,
        resources_id: resourceId
      }
    });

    return res.status(201).json({
      status: 'success',
      message: 'Categoria criada com sucesso!',
      category
    });

  } catch (err: any) {
    return res.status(400).json({
      status: 'error',
      error: err.message,
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

  } catch (err: any) {
    return res.status(400).json({
      status: 'error',
      error: err.message,
      message: 'Falha ao tentar criar uma nova subcategoria.'
    });
  }
})


export { resourcesRouter };
