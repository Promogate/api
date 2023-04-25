import {
  FindUserByIdIncludingResourcesRepository,
  GetOffersClicksRepository
} from '@/data/contracts';
import { GetOffersClicks } from '@/domain/features';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetOffersClicksService implements GetOffersClicks {
  constructor(
    @inject('AnalyticsRepository')
    private readonly analyticsRepository: GetOffersClicksRepository,
    @inject('UserRepository')
    private readonly userRepository: FindUserByIdIncludingResourcesRepository
  ) { }

  async execute(input: GetOffersClicks.Input): Promise<GetOffersClicks.Output> {
    const { resources: { id } } = await this.userRepository.findByIdIncludingResources({ id: input.id })

    const { clicks } = await this.analyticsRepository.getClicks({ resourceId: id })

    return {
      clicks
    }
  }
}