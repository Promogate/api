import { ISignUpRepo } from '@/data/contracts';
import { CreateUser } from '@/domain/features';
import { TOKEN_SECRET } from '@/main/config';
import User from '@/v2/domain/models/User';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
@injectable()
export class CreateUserService implements CreateUser {
  constructor(
    @inject('AuthenticationRepository')
    private readonly authenticationRepository: ISignUpRepo
  ) { }

  async execute(input: CreateUser.Input): Promise<CreateUser.Output> {
    const user = User.create({
      name: input.name,
      email: input.email,
      password: input.password,
      agreeWithPolicies: input.agree_with_policies
    })
    const hashedPassword = await hash(user.password, 10);
    const savedUser = await this.authenticationRepository.signUp({ ...input, password: hashedPassword });
    const token = sign({ id: savedUser.id, role: savedUser.user_profile?.role }, TOKEN_SECRET, { expiresIn: '1d' });

    return {
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        created_at: savedUser.created_at,
        user_profile: savedUser.user_profile,
        agree_with_policies: savedUser.agree_with_policies
      }
    }
  }
}
