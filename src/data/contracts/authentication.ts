import { User, UserProfile, UserSocialMedia } from '@prisma/client';

export interface ISignInRepo {
  signIn(input: ISignInRepo.Input): Promise<ISignInRepo.Output>;
}

export namespace ISignInRepo {
  export type Input = {
    email: string;
    password: string;
  }

  export type Output = (User & {
    user_profile: (UserProfile & {
      social_media: UserSocialMedia | null;
    }) | null;
  })
}

export interface ISignUpRepo {
  signUp(input: ISignUpRepo.Input): Promise<ISignUpRepo.Output>
}

export namespace ISignUpRepo {
  export type Input = {
    name: string;
    email: string;
    password: string;
    agree_with_policies: boolean;
  }

  export type Output = (User & {
    user_profile: (UserProfile & {
      social_media: UserSocialMedia | null;
    }) | null;
  })
}