import { IGetProfileRepository } from "@/data/contracts";
import { IGetProfile } from "@/domain/features";

export class GetProfileService implements IGetProfile {
  constructor(
    private readonly analyticsRepository: IGetProfileRepository
  ) {}

  async execute(input: IGetProfile.Input): Promise<IGetProfile.Ouput> {
    const profile = await this.analyticsRepository.getProfile({ id: input.id });
    return profile;
  }
}