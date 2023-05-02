import { ISignInRepo } from '@/data/contracts';
import { AuthenticationFailed, UserNotFound } from '@/domain/error';
import { prisma } from '@/main/config';
import { compare } from 'bcrypt';

export class AuthenticationRepository implements ISignInRepo {
  async signIn(input: ISignInRepo.Input): Promise<ISignInRepo.Ouput> {
    const user = await prisma.user.findUnique({
      where: {
        email: input.email
      }, include: {
        user_profile: true
      }
    });

    if (user === null) throw new UserNotFound();

    const passwordMatch = await compare(input.password, user.password);

    if (passwordMatch === false) throw new AuthenticationFailed();

    return user
  }

}