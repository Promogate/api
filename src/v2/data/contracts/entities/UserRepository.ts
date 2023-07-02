import { SaveUserError } from '@/domain/error';
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
