import { FindUserByEmailRepository } from '@/data/contracts';
import { AuthenticationFailed } from '@/domain/error';
import { CreateSession } from '@/domain/features';
import { TOKEN_SECRET } from '@/main/config';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateSessionService implements CreateSession {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: FindUserByEmailRepository
  ) { }

  async execute(input: CreateSession.Input): Promise<CreateSession.Output> {
    const user = await this.userRepository.findByEmail({ email: input.email })

    const passwordMatch = await compare(input.password, user.password as string)
    if (!passwordMatch) {
      throw new AuthenticationFailed()
    }

    const token = sign({ id: user.id }, TOKEN_SECRET, { expiresIn: '1h' });

    return {
      token
    }
  }
}
