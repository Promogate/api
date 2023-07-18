import { SaveUserRepository } from '@/data/contracts'
import { CreateUserError } from '@/domain/error'
import { CreateUser } from '@/domain/features/CreateUser'
import { mock, MockProxy } from 'jest-mock-extended'

class CreateUserUseCase implements CreateUser {
  constructor(private readonly userRepository: SaveUserRepository) { }

  async execute(input: CreateUser.Input): Promise<CreateUserError> {
    await this.userRepository.save(input)
    return new CreateUserError()
  }
}

describe('CreateUserUseCase', () => {
  let repository: MockProxy<SaveUserRepository>
  let sut: CreateUserUseCase
  const input = { name: 'any_name', email: 'any_email', password: 'any_pass', agreeWithPolicies: true }

  beforeEach(() => {
    repository = mock()
    sut = new CreateUserUseCase(repository)
  })

  test('it should call SaveUserRepository with correct params', async () => {
    await sut.execute(input)
    expect(repository.save).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_pass',
      agreeWithPolicies: true,
    })
  })

  test('it should CreateUserUseCase throws CreateUserError', async () => {
    const result = await sut.execute(input)
    expect(result).toEqual(new CreateUserError)
  })
})

export { }
