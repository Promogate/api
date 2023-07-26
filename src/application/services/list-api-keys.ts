import { ListAPIKeysRepository } from '@/data/contracts';
import { ListAPIKeys } from '@/domain/features';

export class ListAPIKeysService implements ListAPIKeys {
  constructor (
    private readonly acceccKeysRepository: ListAPIKeysRepository
  ) {}

  async execute(input: ListAPIKeys.Input): Promise<ListAPIKeys.Output> {
    const keys = await this.acceccKeysRepository.list(input);
    return keys
  }
}