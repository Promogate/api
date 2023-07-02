import { SaveUserError } from '@/v2/domain/errors';
import { User } from '@/v2/domain/models';

export interface SaveUser {
  execute(input: SaveUser.input): Promise<SaveUser.output>
}

export namespace SaveUser {
  export type input = {
    name: string;
    email: string;
    password: string;
    agreeWithPolicies: boolean;
  }
  export type output = User | SaveUserError
}