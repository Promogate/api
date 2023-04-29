import {
  CreateUserRepository,
  FindUserByEmailIncludingPasswordRepository,
  FindUserByEmailRepository,
  FindUserByIdIncludingResourcesRepository,
  FindUserByIdRepository
} from '@/data/contracts';
import { CreateUserFailed, UserAlredyExistsError, UserNotFound } from '@/domain/error';
import { prisma } from '@/main/config';
import { generatApiKey, generateExpirationDate } from '@/main/utils';

export class UserRepository implements
  CreateUserRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository,
  FindUserByIdIncludingResourcesRepository,
  FindUserByEmailIncludingPasswordRepository {
  async create(input: CreateUserRepository.Input): Promise<CreateUserRepository.Ouput> {
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
          resources: {
            create: {
              resources_analytics: {
                create: {}
              },
            }
          },
          api_keys: {
            create: {
              key: generatApiKey(),
              expiration_date: generateExpirationDate(1, 'year'),
            }
          },
        }
      })

      return {
        user_id: user.id
      }
    } catch (error: unknown) {
      throw new CreateUserFailed()
    }
  }

  async findByEmail(input: FindUserByEmailRepository.Input): Promise<FindUserByEmailRepository.Output> {
    const user = await prisma.user.findUnique({ where: { email: input.email } })

    if (user === null) {
      throw new UserNotFound()
    }
    
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      created_at: user.created_at
    }
  }

  async findByEmailIncludingPassword (input: FindUserByEmailIncludingPasswordRepository.Input): Promise<FindUserByEmailIncludingPasswordRepository.Output> {
    const user = await prisma.user.findUnique({ where: { email: input.email } })

    if (user === null) {
      throw new UserNotFound()
    }
    
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      created_at: user.created_at,
      password: user.password
    }
  }

  async findById(input: FindUserByIdRepository.Input): Promise<FindUserByIdRepository.Output> {
    const user = await prisma.user.findFirst({ where: { id: input.id } });

    if (!user) {
      throw new UserNotFound()
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      created_at: user.created_at
    }
  }

  async findByIdIncludingResources(input: FindUserByIdIncludingResourcesRepository.Input): Promise<FindUserByIdIncludingResourcesRepository.Output> {
    const user = await prisma.user.findUnique({
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

    if (!user.resources) {
      throw new Error('Failed to find resources from this user.')
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      created_at: user.created_at,
      resources: user.resources
    }
  }
}