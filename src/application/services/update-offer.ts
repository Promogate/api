import { UpdateOffer } from '@/domain/features';
import { prisma } from '@/main/config';
import { injectable } from 'tsyringe';

@injectable()
export class UpdateOfferService implements UpdateOffer {
  async execute(input: UpdateOffer.Input): Promise<UpdateOffer.Ouput> {
    const updateOffer = await prisma.offer.update({
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

    return updateOffer
  }
}