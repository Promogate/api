import { CreateUserRepository, FindUserByEmailRepository, FindUserByIdRepository } from '@/data/contracts';
import { CreateUserFailed, UserAlredyExistsError, UserNotFound } from '@/domain/error';
import { prisma } from '@/main/config';

export class UserRepository implements CreateUserRepository, FindUserByEmailRepository, FindUserByIdRepository {
  async create(input: CreateUserRepository.Input): Promise<CreateUserRepository.Ouput> {
    const userAlreadyExists = await prisma.user.findUnique({ where: { email: input.email }});

    if (userAlreadyExists) {
      throw new UserAlredyExistsError();
    }

    try {
      await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password
        }
      })
    } catch (error: unknown) {
      throw new CreateUserFailed()
    }
  }

  async findByEmail(input: FindUserByEmailRepository.Input): Promise<FindUserByEmailRepository.Output> {
    const user = await prisma.user.findUnique({ where: { email: input.email } })

    if (user === null) {
      throw new UserNotFound()
    }

    if (user.name) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password
      }
    }

    return {
      id: user.id,
      email: user.email,
      password: user.password
    }
    
  }

  async findById (input: FindUserByIdRepository.Input): Promise<FindUserByIdRepository.Output> {
    const user = await prisma.user.findFirst({ where: { id: input.id } });

    if (!user) {
      throw new UserNotFound()
    }

    if (user.name) {
      return {
        id: user.id,
        email: user.email,
        name: user.name
      }
    }

    return {
      id: user.id,
      email: user.email
    }
  }
}