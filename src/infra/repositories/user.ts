import { CreateUserRepository, FindUserByEmailRepository } from '@/data/contracts';
import { CreateUserFailed, UserAlredyExistsError } from '@/domain/error';
import { prisma } from '@/main/config';
import { injectable } from 'tsyringe';

@injectable()
export class UserRepository implements CreateUserRepository, FindUserByEmailRepository {
  async create(input: CreateUserRepository.Input): Promise<CreateUserRepository.Ouput> {
    try {
      const userAlreadyExists = await this.findByEmail({ email: input.email })

      if (userAlreadyExists) {
        throw new UserAlredyExistsError()
      }

      const user = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password
        }
      })

      return {
        id: user.id
      }
    } catch (error: unknown) {
      throw new CreateUserFailed()
    }
  }

  async findByEmail(input: FindUserByEmailRepository.Input): Promise<FindUserByEmailRepository.Output> {
    const user = await prisma.user.findFirst({ where: { email: input.email } })

    return user
  }

}