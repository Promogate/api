import { User } from '@prisma/client'
import { UserNotFound } from '../error'

export interface FindUserByEmail {
  execute: (input: FindUserByEmail.Input) => Promise<FindUserByEmail.Output>
}

export namespace FindUserByEmail {
  export type Input = { email: string }
  export type Output = Omit<User, 'password'> | UserNotFound
}