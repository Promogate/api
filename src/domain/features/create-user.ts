import { CreateUserError } from "@/domain/error";

export interface CreateUser {
  execute(input: CreateUser.Input): Promise<CreateUser.Ouput>
}

export namespace CreateUser {
  export type Input = {
    name: string
    email: string
    password: string
    agreeWithPolicies: boolean
  }

  export type Ouput = {
    token: string,
    id: string
  } | CreateUserError
}