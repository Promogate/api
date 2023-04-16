import { v4 as uuid } from 'uuid';

import { SaveAccessKeysRepository } from '@/data/contracts';
import { CreateApiKey } from '@/domain/features';
import dayjs from 'dayjs';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateApiKeyService implements CreateApiKey {
  constructor (
    @inject('AccessKeysRepository')
    private readonly accessKeysRepository: SaveAccessKeysRepository
  ) {}

  async execute (input: CreateApiKey.Input): Promise<CreateApiKey.Output> {
    const apiKey = uuid();
    const now = dayjs()
    const expirationDate = now.add(1, 'year').toString();

    await this.accessKeysRepository.save({ userId: input.userId, key: apiKey, expirationDate: expirationDate })

    return {
      key: apiKey
    }
  }
}