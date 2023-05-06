import { ListOffersRepository } from '@/data/contracts';
import { ListOffers } from '@/domain/features';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListOffersService implements ListOffers {
  constructor(
    @inject('ResourcesRepository')
    private readonly resourcesRepository: ListOffersRepository,
  ) { }

  async execute(input: ListOffers.Input): Promise<ListOffers.Output> {
    const offers = await this.resourcesRepository.listOffers({ user_id: input.user_id })

    return offers
  }

}
