import { FindUserByIdRepository } from '@/data/contracts';
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
    return user
  }

}