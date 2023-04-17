export interface VerifyRefreshToken {
  execute: (input: VerifyRefreshToken.Input) => Promise<VerifyRefreshToken.Output>
}

export namespace VerifyRefreshToken {
  export type Input = {
    refreshToken: string
  }

  export type Output = boolean
}