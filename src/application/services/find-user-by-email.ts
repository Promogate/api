import { FindUserByEmailRepository } from '@/data/contracts';
import { UserNotFound } from '@/domain/error';
import { FindUserByEmail } from '@/domain/features';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindUserByEmailService implements FindUserByEmail {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: FindUserByEmailRepository
  ) {}

  async execute (input: FindUserByEmail.Input): Promise<FindUserByEmail.Output> {    
    const user = await this.userRepository.findByEmail(input);

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
