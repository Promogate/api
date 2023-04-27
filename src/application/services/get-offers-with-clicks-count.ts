import { GetOffersWithClicksCountRepo } from '@/data/contracts';
import { GetOffersWithClicksCount } from '@/domain/features';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetOffersWithClicksCountService implements GetOffersWithClicksCount {
  constructor (
    @inject('AnalyticsRepository')
    private readonly analyticsRepo: GetOffersWithClicksCountRepo
  ) {}

  async execute (input: GetOffersWithClicksCount.Input): Promise<GetOffersWithClicksCount.Output> {
    const offers = await this.analyticsRepo.getOffersWithClicksCount({ user_id: input.user_id });
    return offers
  }
}