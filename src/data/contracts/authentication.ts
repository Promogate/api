import { User, UserProfile } from '@prisma/client';

export interface ISignInRepo {
  signIn(input: ISignInRepo.Input): Promise<ISignInRepo.Ouput>;
}

export namespace ISignInRepo {
  export type Input = {
    email: string;
    password: string;
  }

  export type Ouput = (Omit<User, 'password'> & { user_profile: UserProfile | null; })
}