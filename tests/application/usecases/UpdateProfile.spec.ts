import { ErrorHandler, HttpStatusCode } from "@/application/utils"
import { UpdateProfileRepository } from "@/data/contracts"
import { UpdateProfile } from "@/domain/features"
import { MockProxy, mock } from "jest-mock-extended"

class UpdateProfileUseCase implements UpdateProfile {
    constructor(private readonly profileRepository: UpdateProfileRepository){}

    async execute(input: UpdateProfile.Input): Promise<void> {
        try {
            await this.profileRepository.updateProfile(input)
        } catch {
            throw new UpdateProfileError()
        }
    }
}

export class UpdateProfileError extends ErrorHandler {
    constructor() {
        super({
            message: 'Serviço de atualização de perfil do usuário falhou ao tentar executar',
            name: 'UpdateProfileError',
            statusCode: HttpStatusCode.INTERNAL_SERVER
        })
    }
}

describe('UpdateProfileUseCase', () => {
    let sut: UpdateProfileUseCase
    let profileRepository: MockProxy<UpdateProfileRepository>
    const input = {
        profileId: '',
        name: '',
        storeImage: '',
        storeName: '',
        storeNameDisplay: '',
        facebook: '',
        instagram: '',
        whatsapp: '',
        telegram: '',
        twitter: '',
        lomadeeSourceId: '',
    }
    beforeEach(() => {
        profileRepository = mock()
        sut = new UpdateProfileUseCase(profileRepository)
    })

    test('it should UpdateProfileUseCase calls updateProfile repository method with correct params', async () => {
        await sut.execute(input)
        expect(profileRepository.updateProfile).toHaveBeenCalledWith({
            profileId: '',
            name: '',
            storeImage: '',
            storeName: '',
            storeNameDisplay: '',
            facebook: '',
            instagram: '',
            whatsapp: '',
            telegram: '',
            twitter: '',
            lomadeeSourceId: '',
        })
    })
})