import { User } from '@prisma/client'

export interface FindUserByEmail {
  execute: (input: FindUserByEmail.Input) => Promise<FindUserByEmail.Output>
}

export namespace FindUserByEmail {
  export type Input = { email: string }
  export type Output = Omit<User, 'password'>
}