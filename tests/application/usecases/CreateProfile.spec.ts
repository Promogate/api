import { CreateProfileUseCase } from "@/application/usecases"
import { ErrorHandler, HttpStatusCode } from "@/application/utils"
import { CreateProfileRepository, FindProfileByNameRepository } from "@/data/contracts"
import { MockProxy, mock } from "jest-mock-extended"

describe('CreateProfileUseCase', () => {
    let userRepository: MockProxy<FindProfileByNameRepository & CreateProfileRepository>
    let sut: CreateProfileUseCase
    const input = {
        storeImage: 'any_image',
        storeName: 'any_name',
        storeNameDisplay: 'any_name',
        userId: 'any_id'
    }

    beforeEach(() => {
        userRepository = mock()
        sut = new CreateProfileUseCase(userRepository)
    })

    test('it should call CreateProfileUseCase with correct params', async () => {
        userRepository.checkProfile.mockResolvedValue(undefined)
        userRepository.createProfile.mockResolvedValue({ profileId: '' })
        await sut.execute(input)
        expect(userRepository.createProfile).toHaveBeenCalledWith({
            storeImage: 'any_image',
            storeName: 'any_name',
            storeNameDisplay: 'any_name',
            userId: 'any_id'
        })
    })

    test('it should throw Error UserProfileAlreadyExists when checkProfile method returns value', async () => {
        userRepository.checkProfile.mockResolvedValue({ profile: '' })
        await expect(sut.execute(input)).rejects.toThrow(new ErrorHandler({
            statusCode: HttpStatusCode.BAD_REQUEST,
            name: 'UserProfileAlreadyExists',
            message: `Perfil já existe. (${input.storeNameDisplay} / ${input.storeName})`
        }))
    })
})