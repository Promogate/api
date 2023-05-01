import { Resources, User } from '@prisma/client'

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
    user_id: string,
    role: string
  }
}

export interface FindUserByEmailRepository {
  findByEmail: (input: FindUserByEmailRepository.Input) => Promise<FindUserByEmailRepository.Output>
}

export namespace FindUserByEmailRepository {
  export type Input = {
    email: string
  };

  export type Output = Omit<User, 'password'>
}

export interface FindUserByEmailIncludingPasswordRepository {
  findByEmailIncludingPassword: (input: FindUserByEmailIncludingPasswordRepository.Input) => Promise<FindUserByEmailIncludingPasswordRepository.Output>
}

export namespace FindUserByEmailIncludingPasswordRepository {
  export type Input = {
    email: string
  };

  export type Output = User
}

export interface FindUserByIdRepository {
  findById: (input: FindUserByIdRepository.Input) => Promise<FindUserByIdRepository.Output>;
}

export namespace FindUserByIdRepository {
  export type Input = {
    id: string
  }

  export type Output = Omit<User, 'password'> | null
}

export interface FindUserByIdIncludingResourcesRepository {
  findByIdIncludingResources: (input: FindUserByIdIncludingResourcesRepository.Input) => Promise<FindUserByIdIncludingResourcesRepository.Output>;
}

export namespace FindUserByIdIncludingResourcesRepository {
  export type Input = {
    id: string
  }

  export type Output = (Omit<User, 'password'> & {resources: Resources})
}