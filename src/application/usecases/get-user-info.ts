import { GetUserInfoRepository } from "@/data/contracts";
import { GetUserInfoError } from "@/domain/error";
import { GetUserInfo } from "@/domain/features";

export class GetUserInfoUseCase implements GetUserInfo {
    constructor(private readonly profileRepository: GetUserInfoRepository) {}

    async execute(input: GetUserInfo.Input): Promise<GetUserInfo.Output> {
        const output = await this.profileRepository.getUserInfo(input);
        if (!output) throw new GetUserInfoError();
        return {
            id: output.id,
            email: output.email,
            name: output.name,
            userProfile: {
                storeImage: output.userProfile.storeImage,
                storeName: output.userProfile.storeName,
                storeNameDisplay: output.userProfile.storeNameDisplay
            }
        };
    }
}
