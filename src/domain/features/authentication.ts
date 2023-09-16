import { User, UserProfile, UserSocialMedia } from "@prisma/client";

export interface ISignIn {
  execute(input: ISignIn.Input): Promise<ISignIn.Output>
}

export namespace ISignIn {
  export type Input = {
    email: string;
    password: string;
  }

  export type Output = {
    token: string, 
    user: (Omit<User, "password"> & {
      user_profile: (UserProfile & {
        social_media: UserSocialMedia | null;
      }) | null;
    })
  }
}