import { User } from '@prisma/client';

export interface FindUserByEmailRepository {
  findByEmail: (input: FindUserByEmailRepository.Input) => Promise<FindUserByEmailRepository.Output>
}

export namespace FindUserByEmailRepository {
  export type Input = {
    email: string
  };

  export type Output = Omit<User, 'password'> | null
}