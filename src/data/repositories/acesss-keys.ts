import {
  DeleteApiKeyRepository,
  FindAPIKeyRepository,
  ListAPIKeysRepository,
  SaveAccessKeysRepository
} from '@/data/contracts';
import { prisma } from '@/main/config';

/*eslint-disable @typescript-eslint/no-explicit-any */
export class AccessKeysRepository implements
  SaveAccessKeysRepository,
  FindAPIKeyRepository,
  ListAPIKeysRepository,
  DeleteApiKeyRepository {
  async save(input: SaveAccessKeysRepository.Input): Promise<SaveAccessKeysRepository.Output> {
    try {
      const saved = await prisma.apiKey.create({
        data: {
          user_id: input.userId,
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
      const accessKeys = await prisma.apiKey.findFirst({
        where: {
          key: input.apiKey
        }
      })

      if (accessKeys === null) {
        throw new Error('Invalid API Key');
      }

      return {
        ...accessKeys,
        userId: accessKeys.user_id as string,
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async list(input: ListAPIKeysRepository.Input): Promise<ListAPIKeysRepository.Output> {
    try {
      const keys = await prisma.apiKey.findMany({
        where: {
          user_id: input.userId
        }
      })

      return keys
    } catch (error: any) {
      throw new Error('Failed to list keys from repository')
    }
  }

  async delete (input: DeleteApiKeyRepository.Input): Promise<DeleteApiKeyRepository.Output> {
    try {
      await prisma.apiKey.delete({
        where: {
          id: input.id
        }
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}