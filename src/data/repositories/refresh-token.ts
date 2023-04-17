import { FindRefreshTokenRepository, SaveRefreshTokenRepository } from '@/data/contracts';
import { SaveRefreshTokenError } from '@/domain/error';
import { prisma } from '@/main/config';

export class RefreshTokenRepository implements SaveRefreshTokenRepository, FindRefreshTokenRepository {
  async save(input: SaveRefreshTokenRepository.Input): Promise<SaveRefreshTokenRepository.Output> {
    try {
      await prisma.refreshToken.create({
        data: {
          userId: input.userId,
          token: input.token,
          expiration_date: input.expirationDate
        }
      })
    } catch (error) {
      throw new SaveRefreshTokenError()
    }
  }

  async find(input: FindRefreshTokenRepository.Input): Promise<FindRefreshTokenRepository.Output> {
    try {
      const refreshToken = await prisma.refreshToken.findUnique({
        where: {
          token: input.refreshToken
        }
      })

      if (refreshToken === null) {
        return null
      }

      return {
        id: refreshToken.id,
        refreshToken: refreshToken.token,
        expirationDate: refreshToken.expiration_date.toString(),
      }
    } catch {
      throw new Error('')
    }
  }
}