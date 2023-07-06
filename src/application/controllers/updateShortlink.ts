import { CreateShortlinkService } from '@/application/services';
import { VerifiedTokenRequest } from '@/domain/models';
import { prisma } from '@/main/config';
import { Response } from 'express';
import { container } from 'tsyringe';
import { ErrorHandler, HttpStatusCode } from '../utils';

class UpdateShortlinkController {
  async handle (req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const { offerId } = req.params as { offerId: string };

    const offer = await prisma.offer.findUnique({
      where: {
        id: offerId
      },
      include: {
        resources: {
          include: {
            user_profile: true
          }
        }
      }
    })

    if (!offer) {
      throw new ErrorHandler({
        statusCode: HttpStatusCode.BAD_REQUEST,
        name: 'FailedToFindOffer',
        message: 'Oferta não encontrada.'
      })
    }

    const productName = offer.title.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f,.'‘’"“”+]/g, '').replace(/[\s/]/g, '-');
    const offerUrl = `https://promogate.app/${offer.resources.user_profile?.store_name}/produto/${productName}/?oid=${offer.id}&utm_click=1&rid=${offer.resources_id}`

    const createShorlinkService = container.resolve(CreateShortlinkService);
    const { shortLink } = await createShorlinkService.execute({
      fullLink: offerUrl,
      offerId: offer.id,
      resourceId: offer.resources_id,
      storeName: offer.resources.user_profile?.store_name_display as string,
      destinationLink: offer.destination_link
    })

    const updatedOffer = await prisma.offer.update({
      where: {
        id: offer.id
      }, data: {
        short_link: shortLink
      }
    })

    return res.status(200).json({
      status: 'success',
      message: 'Shortlink atualizado com sucesso!',
      data: updatedOffer
    })
  }
}

export const updateShortlinkController = new UpdateShortlinkController();