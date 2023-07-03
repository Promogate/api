import {
  FindUserByEmailRepository,
  SaveUserRepository
} from '@/v2/data/contracts/repositories';
import { SaveUserError, UserAlreadyRegisteredError } from '@/v2/domain/errors';
import { SaveUser } from '@/v2/domain/features';

export class SaveUserService implements SaveUser {
  constructor(private readonly repository: SaveUserRepository & FindUserByEmailRepository) { }

  async execute(input: SaveUser.input): Promise<SaveUserError> {
    const foundUser = await this.repository.findByEmail({ email: input.email });
    if (foundUser) throw new UserAlreadyRegisteredError();
    await this.repository.saveUser(input);
    return new SaveUserError();
  }
}
