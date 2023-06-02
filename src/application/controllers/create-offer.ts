import { CreateShortlinkService } from '@/application/services';
import { VerifiedTokenRequest } from '@/domain/models';
import { prisma } from '@/main/config';
import { Response } from 'express';
import { container } from 'tsyringe';

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
/*eslint-disable @typescript-eslint/no-explicit-any*/
class CreateOfferController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
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
          short_link: 'pgate.app',
          resources: {
            connect: {
              id: resourceId
            }
          }
        }
      })

      const store = offer.store_name.toLocaleLowerCase().replace(' ', '-');
      const productName = offer.title.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f,.'‘’"“”+]/g, '').replace(/[\s/]/g, '-');
    
      const offerUrl = `/${store}/produto/${productName}/?oid=${offer.id}&utm_click=1&rid=${offer.resources_id}`

      const createShorlinkService = container.resolve(CreateShortlinkService);
      const shortlinkResult = await createShorlinkService.execute({ 
        fullLink: offerUrl,
        offerId: offer.id,
        resourceId: offer.resources_id,
        storeName: offer.store_name
      })

      const updatedOffer = await prisma.offer.update({
        where: {
          id: offer.id,
        },
        data: {
          short_link: shortlinkResult.shortLink
        }
      })

      return res.status(201).json({
        status: 'success',
        message: 'Oferta criada com sucesso!',
        offer: updatedOffer
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