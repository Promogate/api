import {
  DeleteApiKeyRepository,
  FindAPIKeyRepository,
  ListAPIKeysRepository,
  SaveAccessKeysRepository
} from '@/data/contracts';
import { prisma } from '@/main/config';

export class AccessKeysRepository implements
  SaveAccessKeysRepository,
  FindAPIKeyRepository,
  ListAPIKeysRepository,
  DeleteApiKeyRepository {
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

  async find(input: FindAPIKeyRepository.Input): Promise<FindAPIKeyRepository.Output> {
    try {
      const accessKeys = await prisma.accessKeys.findFirst({
        where: {
          key: input.apiKey
        }
      })

      if (accessKeys === null) {
        throw new Error('Invalid API Key');
      }

      return {
        ...accessKeys,
        userId: accessKeys.userId as string,
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async list(input: ListAPIKeysRepository.Input): Promise<ListAPIKeysRepository.Output> {
    try {
      const keys = await prisma.accessKeys.findMany({
        where: {
          userId: input.userId
        }
      })

      return keys
    } catch (error: any) {
      throw new Error('Failed to list keys from repository')
    }
    //
  }

  async delete (input: DeleteApiKeyRepository.Input): Promise<DeleteApiKeyRepository.Output> {
    try {
      await prisma.accessKeys.delete({
        where: {
          id: input.id
        }
      })
    } catch {
      throw new Error('Failed to delete the api key from repository');
    }
  }
}