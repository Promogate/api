import { SaveUserError, UserNotFoundError } from '@/v2/domain/errors';
import { User } from '@/v2/domain/models';

export interface SaveUserRepository {
  saveUser(input: SaveUserRepository.input): Promise<SaveUserRepository.output>;
}

export namespace SaveUserRepository {
  export type input = {
    name: string;
    email: string;
    password: string;
    agreeWithPolicies: boolean;
  }

  export type output = User | SaveUserError
}

export interface FindUserByEmailRepository {
  findByEmail(input: FindUserByEmailRepository.Input): Promise<FindUserByEmailRepository.Output>
}

export namespace FindUserByEmailRepository {
  export type Input = {
    email: string;
  }

  export type Output = {
    id: string;
    name: string;
    email: string;
    agreeWithPolicies: string;
  } | UserNotFoundError
}
