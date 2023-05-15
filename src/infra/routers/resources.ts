import {
  getStoreDataController
} from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { VerifiedTokenRequest } from '@/domain/models';
import { prisma } from '@/main/config';
import { Request, Response, Router } from 'express';

/*eslint-disable @typescript-eslint/no-explicit-any*/
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
  is_on_showcase: boolean | undefined;
  is_free_shipping: boolean | undefined;
}

type CreateCategoryBody = {
  name: string;
}

type CreateSubcategoryBody = {
  name: string;
}

resourcesRouter.get('/offers/:store', async (req: Request, res: Response) => {
  const { store } = req.params as { store: string };

  try {
    const user_profile = await prisma.userProfile.findFirst({
      where: {
        store_name: {
          equals: store,
          mode: 'insensitive',
        }
      }, include: {
        resources: {
          select: {
            offers: {
              take: 50,
              where: {
                is_on_showcase: {
                  equals: true,
                }
              }, include: {
                _count: {
                  select: {
                    offer_clicks: true
                  }
                }
              }
            }
          }
        }
      }
    })

    return res.status(200).json({
      status: 'success',
      message: 'Ofertas encontradas',
      user_profile
    })
  } catch (error: any) {
    return res.status(400).json({
      status: 'error',
      error: error.message,
      message: 'Algo deu erro ao tentar criar uma nova oferta'
    })
  }
});

resourcesRouter.get('/store/:store', getStoreDataController.handle);

resourcesRouter.get('/:resourceId/offer/:offerId', async (req: Request, res: Response) => {
  const { offerId, resourceId } = req.params as { offerId: string, resourceId: string };
  const { utm_click } = req.query as { utm_click?: string };

  try {
    const offer = prisma.offer.findUnique({
      where: {
        id: offerId
      }, include: {
        _count: {
          select: {
            offer_clicks: true,
          }
        },
        resources: {
          select: {
            user_profile: {
              select: {
                store_name: true,
                store_image: true,
              }
            }
          }
        }
      }
    })

    if (!offer) {
      return res.status(400).json({
        status: 'error',
        error: 'Oferta não encontrada',
        message: 'Algo deu erro ao tentar criar uma nova oferta'
      })
    }

    if (utm_click) {
      const resource = prisma.analytics.update({
        where: {
          resources_id: resourceId,
        }, data: {
          offer_clicks: {
            create: {
              offer_id: offerId,
            }
          }
        }
      })

      const transaction = await prisma.$transaction([offer, resource])

      return res.status(200).json({
        status: 'success',
        message: 'Oferta encontrada',
        offer: transaction[0]
      })
    }

    const transaction = await prisma.$transaction([offer])

    return res.status(200).json({
      status: 'success',
      message: 'Oferta encontrada',
      offer: transaction[0]
    })
  } catch (error: any) {
    return res.status(400).json({
      status: 'error',
      error: error.message,
      message: 'Algo deu erro ao tentar criar uma nova oferta'
    })
  }
})

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
        description: body.description,
        price: body.price,
        old_price: body.old_price,
        store_name: body.store_name,
        store_image: body.store_image,
        is_featured: body.is_featured,
        is_free_shipping: body.is_free_shipping,
        is_on_showcase: body.is_on_showcase,
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

  } catch (error: any) {
    return res.status(400).json({
      status: 'error',
      error: error.message,
      message: 'Algo deu erro ao tentar criar uma nova oferta'
    })
  }
});

resourcesRouter.put('/:resourceId/offer/:id', async (req: VerifiedTokenRequest, res: Response) => {
  const { resourceId, id } = req.params as { resourceId: string, id: string };
  try {

    const body = req.body as CreateOfferBody;

    const offer = await prisma.offer.update({
      where: {
        id: id
      },
      data: {
        image: body.image,
        title: body.title,
        destination_link: body.destination_link,
        description: body.description,
        price: body.price,
        old_price: body.old_price,
        store_name: body.store_name,
        store_image: body.store_image,
        is_featured: body.is_featured,
        is_free_shipping: body.is_free_shipping,
        is_on_showcase: body.is_on_showcase,
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
      message: 'Oferta atualizada com sucesso',
      offer
    })

  } catch (error: any) {
    return res.status(400).json({
      status: 'error',
      error: error.message,
      message: 'Algo deu erro ao tentar criar uma nova oferta'
    })
  }
});

resourcesRouter.delete('/offer/:id', async (req: VerifiedTokenRequest, res: Response) => {
  const { id } = req.params as { resourceId: string, id: string };
  try {
    await prisma.offer.delete({
      where: {
        id: id
      }
    })

    return res.status(200).json({
      status: 'success',
      message: 'Oferta excluída com sucesso.'
    })

  } catch (error: any) {
    return res.status(400).json({
      status: 'error',
      error: error.message,
      message: 'Algo deu erro ao tentar excluir uma nova oferta'
    })
  }
});

resourcesRouter.put('/offer/:offerId/update/showcase', async (req: VerifiedTokenRequest, res: Response) => {
  const { offerId } = req.params as { offerId: string };
  const body = req.body as { is_on_showcase: boolean };
  
  try {
    const offer = await prisma.offer.update({
      where: {
        id: offerId,
      }, data: {
        is_on_showcase: body.is_on_showcase
      }
    })

    return res.status(200).json({
      status: 'success',
      message: 'Oferta atualizada com sucesso com sucesso!',
      offer
    })
  } catch (error: any) {
    return res.status(400).json({
      status: 'error',
      error: error.message,
      message: 'Algo deu erro ao tentar atualizar a oferta'
    })
  }
})

resourcesRouter.put('/offer/:offerId/update/featured', async (req: VerifiedTokenRequest, res: Response) => {
  const { offerId } = req.params as { offerId: string };
  const body = req.body as { is_featured: boolean };
  
  try {
    const offer = await prisma.offer.update({
      where: {
        id: offerId,
      }, data: {
        is_featured: body.is_featured
      }
    })

    return res.status(200).json({
      status: 'success',
      message: 'Oferta atualizada com sucesso com sucesso!',
      offer
    })
  } catch (error: any) {
    return res.status(400).json({
      status: 'error',
      error: error.message,
      message: 'Algo deu erro ao tentar atualizar a oferta'
    })
  }
})

resourcesRouter.put('/:resourcesId/offer/:offerId/connect/category/:categoryId', async (req: VerifiedTokenRequest, res: Response) => {
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

  } catch (error: any) {
    return res.status(400).json({
      status: 'error',
      error: error.message,
      message: 'Falha ao tentar criar uma nova categoria.'
    });
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
