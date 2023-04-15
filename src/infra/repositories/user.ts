import { CreateUserRepository } from '@/data/contracts';
import { CreateUserFailed, UserAlredyExistsError } from '@/domain/error';
import { prisma } from '@/main/config';

export class UserRepository implements CreateUserRepository {
  async create (input: CreateUserRepository.Input): Promise<CreateUserRepository.Ouput> {
    try {
      const userAlreadyExists = await prisma.user.findFirst({ where: { email: input.email } })

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

}