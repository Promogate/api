import uuidAPIKey from 'uuid-apikey';

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
    const { apiKey } = uuidAPIKey.create();
    const key = apiKey.replace(/[-]/g, '')
    const now = dayjs()
    const expirationDate = now.add(1, 'year').format();

    await this.accessKeysRepository.save({ userId: input.id, key, expirationDate })

    return {
      key
    }
  }
}