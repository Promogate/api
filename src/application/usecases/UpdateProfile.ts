import { UpdateProfileRepository } from "@/data/contracts"
import { UpdateProfileError } from "@/domain/error"
import { UpdateProfile } from "@/domain/features"

export class UpdateProfileUseCase implements UpdateProfile {
    constructor(private readonly profileRepository: UpdateProfileRepository){}

    async execute(input: UpdateProfile.Input): Promise<UpdateProfile.Output> {
        try {
            await this.profileRepository.updateProfile(input)
        } catch {
            throw new UpdateProfileError()
        }
    }
}