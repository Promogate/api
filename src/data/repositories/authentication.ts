import { ISignInRepo } from '@/data/contracts';
import { UserNotFound } from '@/domain/error';
import { prisma } from '@/main/config';

export class AuthenticationRepository implements ISignInRepo {
  async signIn(input: ISignInRepo.Input): Promise<ISignInRepo.Output> {
    const user = await prisma.user.findUnique({
      where: {
        email: input.email
      }, include: {
        user_profile: {
          include: {
            social_media: true
          }
        }
      }
    });

    if (user === null) throw new UserNotFound()

    return user
  }
}