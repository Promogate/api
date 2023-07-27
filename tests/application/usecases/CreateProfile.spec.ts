import { CreateProfileService } from "@/application/services"
import { CreateProfileRepository, FindProfileByNameRepository } from "@/data/contracts"
import { MockProxy, mock } from "jest-mock-extended"

describe('CreateProfileUseCase', () => {
    let userRepository: MockProxy<FindProfileByNameRepository & CreateProfileRepository>
    let sut: CreateProfileService
    const input = {
        storeImage: '',
        storeName: '',
        storeNameDisplay: '',
        userId: ''
    }

    beforeEach(() => {
        userRepository = mock()
        sut = new CreateProfileService(userRepository)
    })

    test('it should call CreateProfileUseCase with correct params', async () => {
        userRepository.checkProfile.mockResolvedValue(undefined)
        userRepository.createProfile.mockResolvedValue({ profileId: '' })
        await sut.execute(input)
        expect(userRepository.createProfile).toHaveBeenCalledWith({
            storeImage: '',
            storeName: '',
            storeNameDisplay: '',
            userId: ''
        })
    })
})