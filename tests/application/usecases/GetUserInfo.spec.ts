import { GetUserInfoUseCase } from "@/application/usecases"
import { GetUserInfoRepository } from "@/data/contracts"
import { GetUserInfoError } from "@/domain/error"
import { MockProxy, mock } from "jest-mock-extended"

describe('GetUserInfoUseCase', () => {
    let profileRepository: MockProxy<GetUserInfoRepository>
    let sut: GetUserInfoUseCase
    const input = { userId: 'any_id' }
    const output = {
        id: input.userId,
        name: 'any_name',
        email: 'any_email',
        userProfile: {
            storeImage: 'any_image',
            storeName: 'any_name',
            storeNameDisplay: 'any_name',
        }
    }

    beforeEach(() => {
        profileRepository = mock()
        sut = new GetUserInfoUseCase(profileRepository)
    })

    test('it should call GetUserInfoUseCase with correct params', async () => {
        profileRepository.getUserInfo.mockResolvedValueOnce(output)
        await sut.execute(input)
        expect(profileRepository.getUserInfo).toHaveBeenCalledWith({ userId: 'any_id' })
    })

    test('it should throw GetUserInfoError when getUserInfo returns undefined', async () => {
        profileRepository.getUserInfo.mockResolvedValueOnce(undefined)
        await expect(() => sut.execute(input)).rejects.toThrow(GetUserInfoError)
    })
})