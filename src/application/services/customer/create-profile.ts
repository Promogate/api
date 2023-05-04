import {
  ICheckProfileRepository,
  ICreateProfileRepository
} from '@/data/contracts';
import { StoreNameAlreadyExists } from '@/domain/error';
import { ICreateProfile } from '@/domain/features';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateProfileService implements ICreateProfile {
  constructor(
    @inject('UserRepository')
    private readonly userRepo: ICreateProfileRepository & ICheckProfileRepository
  ) { }

  async execute(input: ICreateProfile.Input): Promise<ICreateProfile.Output> {
    const { profile: user_profile } = await this.userRepo.checkProfile({ store_name: input.store_name })

    if (user_profile) {
      throw new StoreNameAlreadyExists();
    }

    const { profile } = await this.userRepo.createProfile({
      store_image: input.store_image,
      store_name: input.store_name,
      user: input.user
    });

    return {
      profile
    }
  }
} 