import {
  FindAPIKeyRepository,
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
    @inject('AccessKeysRepository')
    private readonly apiRepository: FindAPIKeyRepository,
    @inject('UserRepository')
    private readonly userRepository: FindUserByIdIncludingResourcesRepository
  ) { }

  async execute(input: ListOffers.Input): Promise<ListOffers.Output> {
    const { userId } = await this.apiRepository.find({ apiKey: input.apiKey })
    const { resources: { id: resourceId } } = await this.userRepository.findByIdIncludingResources({ id: userId })
    const offers = await this.resourcesRepository.listOffers({ resourceId })

    return offers
  }

}
