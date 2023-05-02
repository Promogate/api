import { FindUserByIdRepository } from '@/data/contracts';
import { UserNotFound } from '@/domain/error';
import { FindUserById } from '@/domain/features';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindUserByIdService implements FindUserById {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: FindUserByIdRepository
  ) {}

  async execute (input: FindUserById.Input): Promise<FindUserById.Output> {
    const user = await this.userRepository.findById(input);

    if (user === null) {
      throw new UserNotFound()
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at
    }
  }

}