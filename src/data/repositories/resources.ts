import {
  FindOfferByIdRepository,
  ListOffersRepository,
  SaveOfferRepository,
  SaveOffersFromCSVRepository
} from '@/data/contracts';
import { prisma } from '@/main/config';

/*eslint-disable @typescript-eslint/no-explicit-any*/
export class ResourcesRepository implements 
  SaveOfferRepository,
  ListOffersRepository,
  FindOfferByIdRepository,
  SaveOffersFromCSVRepository {
  async saveOffer(input: SaveOfferRepository.Input): Promise<SaveOfferRepository.Output> {
    try {
      await prisma.offer.create({
        data: {
          resources_id: input.resourceId,
          image: input.image,
          title: input.title,
          old_price: input.oldPrice,
          price: input.price,
          store_image: input.store_image,
          destination_link: input.destination_link,
          expiration_date: input.expiration_date,
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
          resources_id: input.resourceId,
        }, take: 10
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
        expiration_date: offer.expiration_date,
        resourceId: offer.resources_id
      }
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  async saveOffersFromCSV (input: SaveOffersFromCSVRepository.Input): Promise<SaveOffersFromCSVRepository.Output> {
    try {
      const offersWithResourceId = input.offers.map((el) => {
        return {...el, resources_id: input.resource_id}
      })

      await prisma.offer.createMany({
        data: offersWithResourceId
      })
    } catch {
      throw new Error('Failed to save offers from CSV')
    }
  }
}