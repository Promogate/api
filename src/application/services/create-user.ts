import { CreateUserRepository } from '@/data/contracts';
import { CreateUser } from '@/domain/features';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUserService implements CreateUser {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: CreateUserRepository
  ) {}

  async execute(input: CreateUser.Input): Promise<CreateUser.Output> {
    const hashedPassword = await hash(input.password, 10);

    await this.userRepository.create({...input, password: hashedPassword});
  }
}
