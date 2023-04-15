import { CreateUserRepository } from '@/data/contracts';
import { CreateUser } from '@/domain/features';
import { TOKEN_SECRET } from '@/main/config';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUserService implements CreateUser {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: CreateUserRepository
  ) {}

  async execute(input: CreateUser.Input): Promise<CreateUser.Output> {
    const hashedPassword = await hash(input.password, 10);

    const { id } = await this.userRepository.create({...input, password: hashedPassword});

    const token = sign({ id }, TOKEN_SECRET, { expiresIn: '1h' });

    return {
      token
    }
  }
}
