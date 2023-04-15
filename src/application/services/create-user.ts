import { CreateUserRepository } from '@/data/contracts';
import { CreateUser } from '@/domain/features';
import { TOKEN_SECRET } from '@/main/config';
import { sign } from 'jsonwebtoken';

export class CreateUserService implements CreateUser {
  constructor (
    private readonly userRepository: CreateUserRepository
  ) {}

  async execute(input: CreateUser.Input): Promise<CreateUser.Output> {
    const { id } = await this.userRepository.create(input)

    const token = sign({ id }, TOKEN_SECRET, { expiresIn: '1h' })

    return {
      token
    }
  }
}