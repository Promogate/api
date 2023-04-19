import { User } from '@/domain/models'
import { Resources } from '@prisma/client'

export interface CreateUserRepository {
  create: (input: CreateUserRepository.Input) => Promise<CreateUserRepository.Ouput>
}

export namespace CreateUserRepository {
  export type Input = {
    name?: string
    email: string
    password: string
  }

  export type Ouput = void
}

export interface FindUserByEmailRepository {
  findByEmail: (input: FindUserByEmailRepository.Input) => Promise<FindUserByEmailRepository.Output>
}

export namespace FindUserByEmailRepository {
  export type Input = {
    email: string
  };

  export type Output = Partial<User>
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