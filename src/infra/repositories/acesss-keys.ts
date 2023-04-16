import { SaveAccessKeysRepository } from '@/data/contracts';
import { prisma } from '@/main/config';

export class AccessKeysRepository implements SaveAccessKeysRepository {
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
    } catch {
      throw new Error('Error when save apit key')
    }
  }

}