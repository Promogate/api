import { FindRefreshTokenRepository, UpdateRefreshTokenRepository } from '@/data/contracts';
import { RevalidateRefreshToken } from '@/domain/features';
import dayjs from 'dayjs';
import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

@injectable()
export class RevalidateRefreshTokenService implements RevalidateRefreshToken {
  constructor (
    @inject('RefreshTokenRepository')
    private readonly refreshTokenRepository: FindRefreshTokenRepository & UpdateRefreshTokenRepository
  ) {}

  async execute (input: RevalidateRefreshToken.Input): Promise<RevalidateRefreshToken.Output> {
    const oldRefreshToken = await this.refreshTokenRepository.find({ refreshToken: input.oldRefreshToken })
    if (!oldRefreshToken) {
      throw new Error('Failed to find during refresh token revalidation.')
    }

    const newRefreshToken = uuid()
    
    const now = dayjs()
    const expirationDate = now.add(30, 'days').format();

    await this.refreshTokenRepository.update({ userId: oldRefreshToken.id, refreshToken: newRefreshToken, expirationDate })

    return {
      refreshToken: newRefreshToken
    }
  }
}