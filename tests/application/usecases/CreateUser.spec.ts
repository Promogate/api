import { CreateUser } from '@/domain/features/CreateUser'
import { mock, MockProxy } from 'jest-mock-extended'

class CreateUserUseCase implements CreateUser {
  constructor(private readonly userRepository: SaveUserRepository) { }

  async execute(input: CreateUser.Input): Promise<void> {
    await this.userRepository.save(input)
  }
}

interface SaveUserRepository {
  save(input: SaveUserRepository.Input): Promise<SaveUserRepository.Ouput>
}

namespace SaveUserRepository {
  export type Input = {
    name: string
    email: string
    password: string
    agreeWithPolicies: boolean
  }
  export type Ouput = {
    id: string
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
})

export { }
