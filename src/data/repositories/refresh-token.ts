import { SaveRefreshTokenRepository } from '@/data/contracts';
import { SaveRefreshTokenError } from '@/domain/error';
import { prisma } from '@/main/config';

export class RefreshTokenRepository implements SaveRefreshTokenRepository {
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

}
