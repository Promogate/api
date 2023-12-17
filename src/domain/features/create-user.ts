import { ErrorHandler } from "@/application/utils";

export interface CreateUser {
  execute(input: CreateUser.Input): Promise<CreateUser.Output>
}

export namespace CreateUser {
  export type Input = {
    name: string
    email: string
    password: string
    agreeWithPolicies: boolean
  }

  export type Output = {
    token: string,
    id: string
  } | ErrorHandler
}