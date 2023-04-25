import { FindOfferByIdRepository } from '@/data/contracts';
import { FindOfferById } from '@/domain/features';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindOfferByIdService implements FindOfferById {
  constructor (
    @inject('ResourcesRepository')
    private readonly offerRepository: FindOfferByIdRepository
  ) {}

  async execute (input: FindOfferById.Input): Promise<FindOfferById.Output> {
    const offer = await this.offerRepository.findOfferById({ id: input.id, methods: input.methods });

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