import { CreateUser } from '@/domain/features';
import { UserRepository } from '@/infra/repositories';
import { TOKEN_SECRET } from '@/main/config';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { container, injectable } from 'tsyringe';

@injectable()
export class CreateUserService implements CreateUser {
  async execute(input: CreateUser.Input): Promise<CreateUser.Output> {
    const hashedPassword = await hash(input.password, 10);
    const userRepository = container.resolve(UserRepository)

    const { id } = await userRepository.create({...input, password: hashedPassword});

    const token = sign({ id }, TOKEN_SECRET, { expiresIn: '1h' });

    return {
      token
    }
  }
}
