import {
  FindUserByIdIncludingResourcesRepository,
  ListOffersRepository
} from '@/data/contracts';
import { ListOffers } from '@/domain/features';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListOffersService implements ListOffers {
  constructor(
    @inject('ResourcesRepository')
    private readonly resourcesRepository: ListOffersRepository,
    @inject('UserRepository')
    private readonly userRepository: FindUserByIdIncludingResourcesRepository
  ) { }

  async execute(input: ListOffers.Input): Promise<ListOffers.Output> {
    const { resources: { id: resourceId } } = await this.userRepository.findByIdIncludingResources({ id: input.user_id })
    const offers = await this.resourcesRepository.listOffers({ resourceId })

    return offers
  }

}
