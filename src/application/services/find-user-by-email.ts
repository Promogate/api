import { UserNotFound } from '@/domain/error';
import { FindUserByEmail } from '@/domain/features';
import { UserRepository } from '@/infra/repositories';
import { container, injectable } from 'tsyringe';

@injectable()
export class FindUserByEmailService implements FindUserByEmail {
  async execute (input: FindUserByEmail.Input): Promise<FindUserByEmail.Output> {
    const userRepository = container.resolve(UserRepository);
    
    const user = await userRepository.findByEmail(input);

    if (user === null) {
      throw new UserNotFound()
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }

}
