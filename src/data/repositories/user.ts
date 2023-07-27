import { generateApiKey, generateExpirationDate } from '@/application/utils';
import {
  CreateProfileRepository,
  CreateUserRepository,
  FindProfileByNameRepository,
  FindUserByEmailIncludingPasswordRepository,
  FindUserByEmailRepository,
  FindUserByIdIncludingResourcesRepository,
  FindUserByIdRepository
} from '@/data/contracts';
import { UserAlredyExistsError, UserNotFound } from '@/domain/error';
import { prisma } from '@/main/config';

export class UserRepository implements
  CreateUserRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository,
  FindUserByIdIncludingResourcesRepository,
  FindUserByEmailIncludingPasswordRepository,
  FindProfileByNameRepository,
  CreateProfileRepository {
  
  async createProfile(input: CreateProfileRepository.Input): Promise<CreateProfileRepository.Output> {
    const profile = await prisma.userProfile.create({
      data: {
        store_name: input.storeName,
        store_name_display: input.storeNameDisplay,
        store_image: input.storeImage,
        user: {
          connect: {
            id: input.userId,
          }
        },
        resources: {
          create: {
            analytics: {
              create: {
                user_profile: {
                  connect: {}
                },
              }
            }
          }
        },
        api_key: {
          create: {
            key: generateApiKey(),
            expiration_date: generateExpirationDate(1, 'year'),
          }
        }
      }, include: {
        resources: {
          select: {
            id: true
          }
        },
        user: true
      }
    });

    return {
      profileId: profile.id
    }
  }

  async checkProfile(input: FindProfileByNameRepository.Input): Promise<FindProfileByNameRepository.Output> {
    const profile = await prisma.userProfile.findFirst({
      where: {
        store_name: input.storeName,
      }
    })

    if(!profile) return

    return {
      profile: profile.id
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
      throw new Error('Usuário ou email estão incorretos. Tente novamente.')
    }

    return user
  }

  async findByEmailIncludingPassword(input: FindUserByEmailIncludingPasswordRepository.Input): Promise<FindUserByEmailIncludingPasswordRepository.Output> {
    const user = await prisma.user.findUnique({
      where: {
        email: input.email
      }, include: {
        user_profile: true
      }
    });

    if (user === null) {
      throw new Error('Usuário ou email estão incorretos. Tente novamente.')
    }

    return user;
  }

  async findById(input: FindUserByIdRepository.Input): Promise<FindUserByIdRepository.Output> {
    const user = await prisma.user.findFirst({
      where: {
        id: input.id
      }, select: {
        id: true,
        email: true,
        name: true,
        created_at: true,
        user_profile: true,
        agree_with_policies: true
      }
    });

    if (!user) {
      throw new UserNotFound()
    }

    return user
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
      resources: user.user_profile.resources,
      agree_with_policies: user.agree_with_policies
    }
  }
}