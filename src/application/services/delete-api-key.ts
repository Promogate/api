import { DeleteApiKeyRepository } from '@/data/contracts';
import { DeleteAPIKey } from '@/domain/features';

export class DeleteApiKeyService implements DeleteAPIKey {
  constructor (
    private readonly apiRepository: DeleteApiKeyRepository
  ) {}

  async execute (input: DeleteAPIKey.Input): Promise<void> {
    await this.apiRepository.delete({ id: input.id });
  }
}