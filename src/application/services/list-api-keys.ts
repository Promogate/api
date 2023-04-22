import { ListAPIKeysRepository } from '@/data/contracts';
import { ListAPIKeys } from '@/domain/features';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListAPIKeysService implements ListAPIKeys {
  constructor (
    @inject('AccessKeysRepository')
    private readonly acceccKeysRepository: ListAPIKeysRepository
  ) {}

  async execute(input: ListAPIKeys.Input): Promise<ListAPIKeys.Output> {
    const keys = await this.acceccKeysRepository.list(input);
    return keys
  }
}