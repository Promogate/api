import { Resources, User, UserProfile } from '@prisma/client'

export interface SaveUserRepository {
  save(input: SaveUserRepository.Input): Promise<SaveUserRepository.Ouput>
}

export namespace SaveUserRepository {
  export type Input = {
    name: string
    email: string
    password: string
    agreeWithPolicies: boolean
  }
  export type Ouput = undefined | {
    id: string
  }
}

export interface CreateUserRepository {
  create: (input: CreateUserRepository.Input) => Promise<CreateUserRepository.Ouput>
}

export namespace CreateUserRepository {
  export type Input = {
    name: string
    email: string
    password: string
  }

  export type Ouput = {
    user_id: string;
    profile_id: string;
  }
}

export interface FindUserByEmailRepository {
  findByEmail: (input: FindUserByEmailRepository.Input) => Promise<FindUserByEmailRepository.Output>
}

export namespace FindUserByEmailRepository {
  export type Input = {
    email: string
  };

  export type Output = (Omit<User, 'password'> & {
    user_profile: UserProfile | null;
  })
}

export interface FindUserByEmailIncludingPasswordRepository {
  findByEmailIncludingPassword: (input: FindUserByEmailIncludingPasswordRepository.Input) => Promise<FindUserByEmailIncludingPasswordRepository.Output>
}

export namespace FindUserByEmailIncludingPasswordRepository {
  export type Input = {
    email: string
  };

  export type Output = (User & { user_profile: UserProfile | null;})
}

export interface FindUserByIdRepository {
  findById: (input: FindUserByIdRepository.Input) => Promise<FindUserByIdRepository.Output>;
}

export namespace FindUserByIdRepository {
  export type Input = {
    id: string
  }

  export type Output = (Omit<User, 'password'> & { 
    user_profile: UserProfile | null;
   })
}

export interface FindUserByIdIncludingResourcesRepository {
  findByIdIncludingResources: (input: FindUserByIdIncludingResourcesRepository.Input) => Promise<FindUserByIdIncludingResourcesRepository.Output>;
}

export namespace FindUserByIdIncludingResourcesRepository {
  export type Input = {
    id: string
  }

  export type Output = (Omit<User, 'password'> & { resources: Resources })
}

export interface FindUserByAPIKeyRepository {
  findByAPIKey: (input: FindUserByAPIKeyRepository.Input) => Promise<FindUserByAPIKeyRepository.Ouput>
}

export namespace FindUserByAPIKeyRepository {
  export type Input = {
    api_key: string
  }

  export type Ouput = User
}

export interface CreateProfileRepository {
  createProfile(input: CreateProfileRepository.Input): Promise<CreateProfileRepository.Output>
}

export namespace CreateProfileRepository {
  export type Input = {
    userId: string
    storeImage: string
    storeName: string
    storeNameDisplay: string
  }

  export type Output = {
    profileId: string;
  }
}

export interface FindProfileByNameRepository {
  checkProfile(input: FindProfileByNameRepository.Input): Promise<FindProfileByNameRepository.Output>
}

export namespace FindProfileByNameRepository {
  export type Input = {
    storeName: string
  }

  export type Output = {
    profile: string
  } | undefined
}

export interface UpdateProfileRepository {
  updateProfile(input: UpdateProfileRepository.Input): Promise<UpdateProfileRepository.Output>
}

export namespace UpdateProfileRepository {
  export type Input = {
    profileId: string
    name?: string;
    storeImage?: string;
    storeName?: string;
    storeNameDisplay?: string;
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    telegram?: string;
    twitter?: string;
    lomadeeSourceId?: string;
}
  export type Output = void
}

export interface GetUserInfoRepository {
  getUserInfo(input: GetUserInfoRepository.Input): Promise<GetUserInfoRepository.Output>
}

export namespace GetUserInfoRepository {
  export type Input = {
      userId: string
  }
  export type Output = {
      id: string,
      name: string,
      email: string,
      userProfile: {
          storeImage: string,
          storeName: string,
          storeNameDisplay: string,
      }
  }
}