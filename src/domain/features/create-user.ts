export interface CreateUser {
  execute: (input: CreateUser.Input) => Promise<CreateUser.Output>
}

export namespace CreateUser {
  export type Input = {
    name: string
    email: string
    password: string
  }

  export type Output = {
    token: string;
    user: string;
    profile: string;
  }
}