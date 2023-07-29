import { UpdateProfileUseCase } from "@/application/usecases"
import { UpdateProfileRepository } from "@/data/contracts"
import { UpdateProfileError } from "@/domain/error"
import { MockProxy, mock } from "jest-mock-extended"

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

    test('it should throw UpdateProfileError is updateProfile repository method fails', async () => {
        profileRepository.updateProfile.mockRejectedValue({})
        await expect(() => sut.execute(input)).rejects.toThrow(UpdateProfileError)
    })
})