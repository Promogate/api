export interface IGetUserWithToken {
  execute(input: IGetUserWithToken.Input): Promise<IGetUserWithToken.Output>
}

export namespace IGetUserWithToken {
  export type Input = {
    token: string
  }

  export type Output = {
    id: string
  }
}