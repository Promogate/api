import { IGetShowcaseOffers } from '@/domain/features';
import { injectable } from 'tsyringe';

@injectable()
export class GetShowcaseOffersService implements IGetShowcaseOffers {
  async execute(input: IGetShowcaseOffers.Input): Promise<IGetShowcaseOffers.Output> {
    throw new Error('Method not implemented.');
  }

}