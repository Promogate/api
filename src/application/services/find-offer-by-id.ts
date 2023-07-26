import { AddOfferClickRepository, FindOfferByIdRepository } from '@/data/contracts';
import { FindOfferById } from '@/domain/features';
import { ErrorHandler, HttpStatusCode } from '../utils';

export class FindOfferByIdService implements FindOfferById {
  constructor (
    private readonly offerRepository: FindOfferByIdRepository,
    private readonly analyticsRepository: AddOfferClickRepository
  ) {}

  async execute (input: FindOfferById.Input): Promise<FindOfferById.Output> {
    const offer = await this.offerRepository.findOfferById({ id: input.id });

    if(!offer) throw new ErrorHandler({
      statusCode: HttpStatusCode.NOT_FOUND,
      name: 'OfferNotFound',
      message: 'Falha ao tentar encontrar a oferta com id: ' + input.id
    })

    if (input.methods && input.methods['addClick']) {
      await this.analyticsRepository.addClick({ id: offer.id })
    }

    return {
      id: offer.id,
      title: offer.title,
      image: offer.image,
      old_price: offer.old_price,
      price: offer.price,
      destination_link: offer.destination_link,
      store_image: offer.store_image,
      expiration_date: offer.expiration_date,
      resourceId: offer.resourceId
    }
  }
}