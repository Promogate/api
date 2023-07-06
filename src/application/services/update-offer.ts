import { UpdateOffer } from '@/domain/features';
import { prisma } from '@/main/config';
import { container, injectable } from 'tsyringe';
import { ErrorHandler, HttpStatusCode } from '../utils';
import { UpdateShortlinkDestinationLinkService } from './UpdateShortlinkDestinationLink';

@injectable()
export class UpdateOfferService implements UpdateOffer {
  async execute(input: UpdateOffer.Input): Promise<UpdateOffer.Ouput> {
    const foundOffer = await prisma.offer.findUnique({ where: { id: input.offerId } })
    if(!foundOffer) {
      throw new ErrorHandler({ 
        statusCode: HttpStatusCode.NOT_FOUND, 
        name: 'NotFoundOffer',
        message: 'Produto não encontrado.'
      });
    }
    if(input.destinationLink && input.destinationLink !== foundOffer.destination_link) {
      const updatedOffer = await prisma.offer.update({
        where: {
          id: input.offerId
        }, 
        data: {
          image: input.image,
          title: input.title,
          old_price: input.oldPrice,
          price: input.price,
          destination_link: input.destinationLink,
          store_name: input.storeName,
          description: input.description,
        }
      })
      const updateShortlinkService = container.resolve(UpdateShortlinkDestinationLinkService);
      await updateShortlinkService.execute({ 
        destinationLink: input.destinationLink,
        offerId: input.offerId
      })

      return updatedOffer
    }
    const updatedOffer = await prisma.offer.update({
      where: {
        id: input.offerId
      }, 
      data: {
        image: input.image,
        title: input.title,
        old_price: input.oldPrice,
        price: input.price,
        destination_link: input.destinationLink,
        store_name: input.storeName,
        description: input.description,
      }
    })

    return updatedOffer
  }
}