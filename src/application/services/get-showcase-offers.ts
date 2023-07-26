import { IGetShowcaseOffersRepo, IGetStoreDataRepo } from '@/data/contracts';
import { IGetShowcaseOffers } from '@/domain/features';

export class GetShowcaseOffersService implements IGetShowcaseOffers {
  constructor(
    private readonly resourcesRepository: IGetShowcaseOffersRepo & IGetStoreDataRepo
  ) {}

  async execute(input: IGetShowcaseOffers.Input): Promise<IGetShowcaseOffers.Output> {
    const store = await this.resourcesRepository.getStore({ store_name: input.store_name });
    const offers = await this.resourcesRepository.getOffers({ store_name: input.store_name });
    const result = {
      store,
      offers
    }
    return result
  }

}