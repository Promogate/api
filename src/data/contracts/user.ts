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

export interface ICreateProfileRepository {
  createProfile(input: ICreateProfileRepository.Input): Promise<ICreateProfileRepository.Output>
}

export namespace ICreateProfileRepository {
  export type Input = {
    user: string;
    store_image: string;
    store_name: string;
  }

  export type Output = {
    profile: string;
  }
}

export interface ICheckProfileRepository {
  checkProfile(input: ICheckProfileRepository.Input): Promise<ICheckProfileRepository.Output>
}

export namespace ICheckProfileRepository {
  export type Input = {
    store_name: string
  }

  export type Output = {
    profile: UserProfile | null
  }
}