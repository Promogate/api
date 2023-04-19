import {
  CreateUserRepository,
  FindUserByEmailRepository,
  FindUserByIdIncludingResourcesRepository,
  FindUserByIdRepository
} from '@/data/contracts';
import { CreateUserFailed, UserAlredyExistsError, UserNotFound } from '@/domain/error';
import { prisma } from '@/main/config';

export class UserRepository implements
  CreateUserRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository,
  FindUserByIdIncludingResourcesRepository {
  async create(input: CreateUserRepository.Input): Promise<CreateUserRepository.Ouput> {
    const userAlreadyExists = await prisma.user.findUnique({ where: { email: input.email } });

    if (userAlreadyExists) {
      throw new UserAlredyExistsError();
    }

    try {
      await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
          resources: {
            create: {}
          }
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

  async findById(input: FindUserByIdRepository.Input): Promise<FindUserByIdRepository.Output> {
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
      email: user.email,
    }
  }

  async findByIdIncludingResources(input: FindUserByIdIncludingResourcesRepository.Input): Promise<FindUserByIdIncludingResourcesRepository.Output> {
    const user = await prisma.user.findFirst({ 
      where: { 
        id: input.id
      },
      include: {
        resources: true
      }
    });

    if (!user) {
      throw new UserNotFound()
    }

    if (user.name) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        resources: user.resources
      }
    }

    return {
      id: user.id,
      email: user.email,
      resources: user.resources
    }
  }
}