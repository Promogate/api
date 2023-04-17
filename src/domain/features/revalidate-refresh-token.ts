export interface RevalidateRefreshToken {
  execute: () => Promise<RevalidateRefreshToken.Output>
}

export namespace RevalidateRefreshToken {
  export type Output = {
    refreshToken: string
  }
}