
import {
  ErrorHandler,
  HttpStatusCode,
  makeUniqueStoreName
} from "@/application/utils";
import { CreateProfileRepository, FindProfileByNameRepository } from "@/data/contracts";
import { CreateProfile } from "@/domain/features";

export class CreateProfileUseCase implements CreateProfile {
  constructor(private readonly profileRepository: FindProfileByNameRepository & CreateProfileRepository) {}

  async execute(input: CreateProfile.Input): Promise<CreateProfile.Output> {
    const uniqueStoreName = makeUniqueStoreName(input.storeName);
    const profileAlreadyExists = await this.profileRepository.checkProfile({ storeName: input.storeName });
    if (profileAlreadyExists) {
      throw new ErrorHandler({
        statusCode: HttpStatusCode.BAD_REQUEST,
        name: "UserProfileAlreadyExists",
        message: `Perfil já existe. (${input.storeNameDisplay} / ${uniqueStoreName})`
      });
    }
    try {
      const profile = await this.profileRepository.createProfile({ 
        storeImage: input.storeImage,
        storeName: uniqueStoreName,
        storeNameDisplay: input.storeNameDisplay,
        userId: input.userId
      });

      return {
        profileId: profile.profileId
      };
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: error.statusCode,
        name: error.name,
        message: error.message
      });
    }
  }
}