import { FindOffersByAPIKeyRepository } from '@/data/contracts';
import { ListOffers } from '@/domain/features';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListOffersService implements ListOffers {
  constructor(
    @inject('ResourcesRepository')
    private readonly resourcesRepository: FindOffersByAPIKeyRepository,
  ) { }

  async execute(input: ListOffers.Input): Promise<ListOffers.Output> {
    const offers = await this.resourcesRepository.findOffersByAPIKey({ api_key: input.api_key })

    return offers
  }

}
