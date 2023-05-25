import { ISignInRepo } from '@/data/contracts';
import { AuthenticationFailed } from '@/domain/error';
import { ISignIn } from '@/domain/features';
import { TOKEN_SECRET } from '@/main/config';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

@injectable()
export class SignInService implements ISignIn {
  constructor(
    @inject('AuthenticationRepository')
    private readonly authenticationRepo: ISignInRepo
  ) { }

  async execute(input: ISignIn.Input): Promise<ISignIn.Output> {
    const user = await this.authenticationRepo.signIn(input)

    const passwordMatch = await compare(input.password, user.password);

    if (passwordMatch === false) throw new AuthenticationFailed();
    
    const token = sign({ id: user.id, role: user.user_profile?.role }, TOKEN_SECRET, { expiresIn: '1d' })

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        user_profile: user.user_profile
      }
    }
  }
}