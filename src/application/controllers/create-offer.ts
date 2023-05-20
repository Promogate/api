import { prisma } from '@/main/config';
import { Request, Response } from 'express';

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
/*eslint-disable */
class CreateOfferController {
  async handle (req: Request, res: Response): Promise<Response> {
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
  }
}

export const createOfferController = new CreateOfferController()