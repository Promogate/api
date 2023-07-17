import { ISignUpRepo } from '@/data/contracts';
import { CreateUser } from '@/domain/features';
import { TOKEN_SECRET } from '@/main/config';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
@injectable()
export class CreateUserService implements CreateUser {
  constructor(
    @inject('AuthenticationRepository')
    private readonly authenticationRepository: ISignUpRepo
  ) {}

  async execute(input: CreateUser.Input): Promise<CreateUser.Output> {
    const hashedPassword = await hash(input.password, 10);
    const user = await this.authenticationRepository.signUp({...input, password: hashedPassword});
    const token = sign({ id: user.id, role: user.user_profile?.role }, TOKEN_SECRET, { expiresIn: '1d' });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        user_profile: user.user_profile,
        agree_with_policies: user.agree_with_policies
      }
    }
  }
}
