import { SignInUseCase } from "@/application/usecases"
import { FindUserByEmailIncludingPasswordRepository } from "@/data/contracts"
import { SignInError, UserNotFoundError } from "@/domain/error"
import { VerifyPassword } from "@/domain/features"
import { MockProxy, mock } from "jest-mock-extended"

describe('SignInUseCase', () => {
    let userRepository: MockProxy<FindUserByEmailIncludingPasswordRepository>
    let verifyPasswordUseCase: MockProxy<VerifyPassword>
    let sut: SignInUseCase
    const input = { email: 'any_email', password: 'any_password' }
    const userOutput = { id: '', password: '', email: '', role: '' }
    
    beforeEach(() => {
        userRepository = mock()
        verifyPasswordUseCase = mock()
        sut = new SignInUseCase(userRepository, verifyPasswordUseCase)
    })

    test('it should throw UserNotFoundError when findByEmailIncludingPassword returns undefined', async () => {
        userRepository.findByEmailIncludingPassword.mockResolvedValueOnce(undefined)
        await expect(() => sut.execute(input)).rejects.toThrow(UserNotFoundError)
    })

    test('it should throw SignInError when checkPassword is false', async () => {
        userRepository.findByEmailIncludingPassword.mockResolvedValueOnce(userOutput)        
        await expect(() => sut.execute(input)).rejects.toThrow(SignInError)
    })

    test('it should SignInUseCase throw SignInError when verifyPasswordUseCase returns false', async () => {
        userRepository.findByEmailIncludingPassword.mockResolvedValueOnce(userOutput)
        verifyPasswordUseCase.execute.mockResolvedValueOnce(false)
        await expect(() => sut.execute(input)).rejects.toThrow(SignInError)
    })
})