import { FindAPIKeyRepository, SaveAccessKeysRepository } from '@/data/contracts';
import { prisma } from '@/main/config';

export class AccessKeysRepository implements SaveAccessKeysRepository, FindAPIKeyRepository {
  async save(input: SaveAccessKeysRepository.Input): Promise<SaveAccessKeysRepository.Output> {
    try {
      const saved = await prisma.accessKeys.create({
        data: {
          userId: input.userId,
          key: input.key,
          expiration_date: input.expirationDate
        }
      })
      return saved
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  async find (input: FindAPIKeyRepository.Input): Promise<FindAPIKeyRepository.Output> {
    try {
      const accessKeys = await prisma.accessKeys.findFirst({
        where: {
          key: input.apiKey
        }
      })

      if (accessKeys === null) {
        throw new Error('Invalid API Key');
      }

      return accessKeys
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}