export interface RevalidateRefreshToken {
  execute: (input: RevalidateRefreshToken.Input) => Promise<RevalidateRefreshToken.Output>
}

export namespace RevalidateRefreshToken {
  export type Input = {
    oldRefreshToken: string
  }

  export type Output = {
    refreshToken: string
  }
}