import { IGetShowcaseOffersRepo } from '@/data/contracts';
import { IGetShowcaseOffers } from '@/domain/features';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetShowcaseOffersService implements IGetShowcaseOffers {
  constructor(
    @inject('ResourcesRepository')
    private readonly resourcesRepo: IGetShowcaseOffersRepo
  ) {}

  async execute(input: IGetShowcaseOffers.Input): Promise<IGetShowcaseOffers.Output> {
    const offers = await this.resourcesRepo.getOffers({ store_name: input.store_name });
    return offers
  }

}