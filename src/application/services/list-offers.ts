import { ListOffersRepository } from '@/data/contracts';
import { ListOffers } from '@/domain/features';

export class ListOffersService implements ListOffers {
  constructor(
    private readonly resourcesRepository: ListOffersRepository,
  ) { }

  async execute(input: ListOffers.Input): Promise<ListOffers.Output> {
    const offers = await this.resourcesRepository.listOffers({ 
      user_id: input.user_id,
      page: Number(input.page),
      per_page: Number(input.perPage)
    })

    return offers
  }

}