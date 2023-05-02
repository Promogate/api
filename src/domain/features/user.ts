export interface GetUserWithToken {
  execute(input: GetUserWithToken.Input): Promise<GetUserWithToken.Output>
}

export namespace GetUserWithToken {
  export type Input = {
    token: string
  }

  export type Output = {
    id: string
  }
}