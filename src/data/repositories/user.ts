import {
  CreateUserRepository, FindUserByEmailIncludingPasswordRepository,
  FindUserByEmailRepository,
  FindUserByIdIncludingResourcesRepository,
  FindUserByIdRepository,
  ICheckProfileRepository,
  ICreateProfileRepository
} from '@/data/contracts';
import { UserAlredyExistsError, UserNotFound } from '@/domain/error';
import { prisma } from '@/main/config';

/*eslint-disable @typescript-eslint/no-explicit-any*/
export class UserRepository implements
  CreateUserRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository,
  FindUserByIdIncludingResourcesRepository,
  FindUserByEmailIncludingPasswordRepository,
  ICreateProfileRepository,
  ICheckProfileRepository {

  async checkProfile(input: ICheckProfileRepository.Input): Promise<ICheckProfileRepository.Output> {
    const profile = await prisma.userProfile.findFirst({
      where: {
        store_name: input.store_name,
      }
    })

    return {
      profile: profile
    }
  }

  async createProfile(input: ICreateProfileRepository.Input): Promise<ICreateProfileRepository.Output> {
    try {
      const profile = await prisma.userProfile.create({
        data: {
          store_image: input.store_image,
          store_name: input.store_name,
          user: {
            connect: {
              id: input.user,
            }
          }
        }
      });

      return {
        profile: profile.id
      }
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

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
          password: input.password
        }
      })

      return {
        user_id: user.id,
        profile_id: ''
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async findByEmail(input: FindUserByEmailRepository.Input): Promise<FindUserByEmailRepository.Output> {
    const user = await prisma.user.findUnique({ 
      where: { 
        email: input.email 
      }, include: {
        user_profile: true
      }
    })

    if (user === null) {
      throw new UserNotFound()
    }
    
    return user
  }

  async findByEmailIncludingPassword (input: FindUserByEmailIncludingPasswordRepository.Input): Promise<FindUserByEmailIncludingPasswordRepository.Output> {
    const user = await prisma.user.findUnique({ 
      where: { 
        email: input.email 
      } 
    })

    if (user === null) {
      throw new UserNotFound()
    }
    
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      created_at: user.created_at
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
      created_at: user.created_at
    }
  }

  async findByIdIncludingResources(input: FindUserByIdIncludingResourcesRepository.Input): Promise<FindUserByIdIncludingResourcesRepository.Output> {
    const user = await prisma.user.findUnique({
      where: {
        id: input.id
      },
      include: {
        user_profile: {
          include: {
            resources: true
          }
        }
      }
    });

    if (!user) {
      throw new UserNotFound()
    }

    if (!user.user_profile?.resources) {
      throw new Error('Failed to find resources from this user.')
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at,
      resources: user.user_profile.resources
    }
  }
}