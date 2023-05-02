export interface ISignIn {
  execute(input: ISignIn.Input): Promise<ISignIn.Output>
}

export namespace ISignIn {
  export type Input = {
    email: string;
    password: string;
  }

  export type Output = {
    token: string;
    user: string;
    user_profile: string;
  }
}