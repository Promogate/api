/*eslint-disable @typescript-eslint/no-explicit-any*/

export interface CreateSession {
  execute: (input: CreateSession.Input) => Promise<CreateSession.Output>
}

export namespace CreateSession {
  export type Input = {
    email: string
    password: string
  }

  export type Output = any
}