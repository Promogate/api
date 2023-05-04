import { ISignInRepo } from '@/data/contracts';
import { ISignIn } from '@/domain/features';
import { TOKEN_SECRET } from '@/main/config';
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
    
    const token = sign({ id: user.id }, TOKEN_SECRET, { expiresIn: '1d' })

    return {
      token,
      user_profile: user.user_profile?.id ?? '',
      user: user.id
    }
  }

}