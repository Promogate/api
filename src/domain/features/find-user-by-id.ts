import { UserNotFound } from '@/domain/error';
import { User } from '@prisma/client';

export interface FindUserById {
  execute: (input: FindUserById.Input) => Promise<FindUserById.Output>;
}

export namespace FindUserById {
  export type Input = {
    id: string
  };

  export type Output = Omit<User, 'password'> | UserNotFound
}