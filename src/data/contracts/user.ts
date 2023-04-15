import { User } from '@prisma/client'

export interface CreateUserRepository {
  create: (input: CreateUserRepository.Input) => Promise<CreateUserRepository.Ouput>
}

export namespace CreateUserRepository {
  export type Input = {
    name?: string
    email: string
    password: string
  }

  export type Ouput = {
    id: string
  }
}

export interface FindUserByEmailRepository {
  findByEmail: (input: FindUserByEmailRepository.Input) => Promise<FindUserByEmailRepository.Output>
}

export namespace FindUserByEmailRepository {
  export type Input = {
    email: string
  };

  export type Output = Omit<User, 'password'> | null
}