import { IGetProfileRepository } from '@/data/contracts';
import { IGetProfile } from '@/domain/features';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetProfileService implements IGetProfile {
  constructor(
    @inject('AnalyticsRepository')
    private readonly analyticsRepo: IGetProfileRepository
  ) {}

  async execute(input: IGetProfile.Input): Promise<IGetProfile.Ouput> {
    const profile = await this.analyticsRepo.getProfile({ id: input.id });
    return profile
  }
}