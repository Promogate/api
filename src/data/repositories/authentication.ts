import { ISignInRepo, ISignUpRepo, SaveAccessKeysRepository } from '@/data/contracts';
import { UserAlredyExistsError, UserNotFoundError } from '@/domain/error';
import { prisma } from '@/main/config';

export class AuthenticationRepository implements
  ISignInRepo,
  ISignUpRepo,
  SaveAccessKeysRepository {

  async save (input: SaveAccessKeysRepository.Input): Promise<SaveAccessKeysRepository.Output> {
    //
  }

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

    if (user === null) throw new UserNotFoundError()

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
          agree_with_policies: input.agree_with_policies,
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