import { FindUserByEmailRepository, SaveRefreshTokenRepository } from '@/data/contracts';
import { AuthenticationFailed } from '@/domain/error';
import { CreateSession } from '@/domain/features';
import { TOKEN_SECRET } from '@/main/config';
import { compare } from 'bcrypt';
import dayjs from 'dayjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

@injectable()
export class CreateSessionService implements CreateSession {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: FindUserByEmailRepository,
    @inject('RefreshTokenRepository')
    private readonly refreshTokenRepository: SaveRefreshTokenRepository
  ) { }

  async execute(input: CreateSession.Input): Promise<CreateSession.Output> {
    const user = await this.userRepository.findByEmail({ email: input.email })

    const passwordMatch = await compare(input.password, user.password as string)
    if (!passwordMatch) {
      throw new AuthenticationFailed()
    }

    const token = sign({ id: user.id }, TOKEN_SECRET, { expiresIn: '15m' });

    const now = dayjs()
    const expirationDate = now.add(30, 'days').format();
    const refreshToken = uuid()

    await this.refreshTokenRepository.save({
      userId: user.id as string,
      token: refreshToken,
      expirationDate
     })

    return {
      token,
      refreshToken
    }
  }
}
