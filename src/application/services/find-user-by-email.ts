import { FindUserByEmailRepository } from '@/data/contracts';
import { FindUserByEmail } from '@/domain/features';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindUserByEmailService implements FindUserByEmail {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: FindUserByEmailRepository
  ) { }

  async execute(input: FindUserByEmail.Input): Promise<FindUserByEmail.Output> {
    const user = await this.userRepository.findByEmail(input);

    return {
      id: user.id as string,
      name: user.name ? user.name : null,
      email: user.email as string
    }
  }

}
