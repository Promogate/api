import { ISignInRepo, ISignUpRepo } from '@/data/contracts';
import { UserAlredyExistsError, UserNotFound } from '@/domain/error';
import { prisma } from '@/main/config';

/*eslint-disable @typescript-eslint/no-explicit-any*/
export class AuthenticationRepository implements
  ISignInRepo,
  ISignUpRepo {
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

  async signUp(input: ISignUpRepo.Input): Promise<ISignUpRepo.Output> {
    const userAlreadyExists = await prisma.user.findUnique({ where: { email: input.email } });

    if (userAlreadyExists) {
      throw new UserAlredyExistsError();
    }

    try {
      const user = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
          agree_with_policies: input.agree_with_policies
        }, include: {
          user_profile: {
            include: {
              social_media: true
            },
          }
        }
      })

      return user
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}