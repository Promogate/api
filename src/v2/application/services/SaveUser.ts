import { SaveUserRepository } from '@/v2/data/contracts/entities';
import { SaveUserError } from '@/v2/domain/errors';
import { SaveUser } from '@/v2/domain/features';

export class SaveUserService implements SaveUser {
  constructor(private readonly repository: SaveUserRepository) { }

  async execute(input: SaveUser.input): Promise<SaveUserError> {
    await this.repository.saveUser(input);
    return new SaveUserError();
  }
}
