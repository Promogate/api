import { ListOffersRepository, SaveOfferRepository } from '@/data/contracts';
import { prisma } from '@/main/config';

export class ResourcesRepository implements SaveOfferRepository, ListOffersRepository {
  async saveOffer(input: SaveOfferRepository.Input): Promise<SaveOfferRepository.Output> {
    try {
      await prisma.offer.create({
        data: {
          resourcesId: input.resourceId,
          image: input.image,
          title: input.title,
          old_price: input.oldPrice,
          price: input.price,
          store_image: input.storeImage,
          destination_link: input.destinationLink,
          expiration_date: input.expirationDate,
        }
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async listOffers(input: ListOffersRepository.Input): Promise<ListOffersRepository.Output> {
    try {
      const offers = await prisma.offer.findMany({
        where: {
          resourcesId: input.resourceId
        }
      })

      return offers
    } catch (err: any) {
      throw new Error(err.message)
    }
  }
}