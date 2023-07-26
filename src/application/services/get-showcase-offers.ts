import { IGetShowcaseOffersRepo, IGetStoreDataRepo } from '@/data/contracts';
import { IGetShowcaseOffers } from '@/domain/features';

export class GetShowcaseOffersService implements IGetShowcaseOffers {
  constructor(
    private readonly resourcesRepo: IGetShowcaseOffersRepo & IGetStoreDataRepo
  ) {}

  async execute(input: IGetShowcaseOffers.Input): Promise<IGetShowcaseOffers.Output> {
    const store = await this.resourcesRepo.getStore({ store_name: input.store_name });
    const offers = await this.resourcesRepo.getOffers({ store_name: input.store_name });
    const result = {
      store,
      offers
    }
    return result
  }

}