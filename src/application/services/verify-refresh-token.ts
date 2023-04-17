import { FindRefreshTokenRepository } from '@/data/contracts';
import { VerifyRefreshToken } from '@/domain/features';
import dayjs from 'dayjs';
import { inject, injectable } from 'tsyringe';

@injectable()
export class VerifyRefreshTokenService implements VerifyRefreshToken {
  constructor (
    @inject('RefreshTokenREpository')
    private readonly refreshTokenRepository: FindRefreshTokenRepository
  ) {}

  async execute (input: VerifyRefreshToken.Input): Promise<VerifyRefreshToken.Output> {
    const refreshToken = await this.refreshTokenRepository.find({ refreshToken: input.refreshToken });

    if (refreshToken === null) {
      throw new Error('refreshToken is invalid!')
    }

    const now = dayjs();
    const refreshTokenStillValid = now.isBefore(refreshToken.expirationDate);

    if (refreshTokenStillValid === true) {
      return true
    } else {
      return false
    }
  }

}