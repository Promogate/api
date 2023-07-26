import { IGetProfileRepository } from '@/data/contracts';
import { IGetProfile } from '@/domain/features';

export class GetProfileService implements IGetProfile {
  constructor(
    private readonly analyticsRepo: IGetProfileRepository
  ) {}

  async execute(input: IGetProfile.Input): Promise<IGetProfile.Ouput> {
    const profile = await this.analyticsRepo.getProfile({ id: input.id });
    return profile
  }
}