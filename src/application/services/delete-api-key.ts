import { DeleteApiKeyRepository } from '@/data/contracts';
import { DeleteAPIKey } from '@/domain/features';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteApiKeyService implements DeleteAPIKey {
  constructor (
    @inject('AccessKeysRepository')
    private readonly apiRepository: DeleteApiKeyRepository
  ) {}

  async execute (input: DeleteAPIKey.Input): Promise<void> {
    await this.apiRepository.delete(input);
  }
}