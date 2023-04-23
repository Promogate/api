import { FindOfferByIdRepository, ListOffersRepository, SaveOfferRepository } from '@/data/contracts';
import { prisma } from '@/main/config';

export class ResourcesRepository implements 
  SaveOfferRepository,
  ListOffersRepository,
  FindOfferByIdRepository {
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

  async findOfferById (input: FindOfferByIdRepository.Input): Promise<FindOfferByIdRepository.Output> {
    try {
      const offer = await prisma.offer.findUnique({
        where: {
          id: input.id
        }
      });

      if (offer === null) throw new Error('Failed to find offer in repo');

      return {
        id: offer.id,
        title: offer.title,
        image: offer.image,
        price: offer.price,
        old_price: offer.old_price,
        destination_link: offer.destination_link,
        store_image: offer.store_image,
        expiration_date: offer.expiration_date
      }
    } catch (err: any) {
      throw new Error(err.message)
    }
  }
}