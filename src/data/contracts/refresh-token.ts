export interface SaveRefreshToken {
  save: (input: SaveRefreshToken.Input) => Promise<SaveRefreshToken.Output>
}

export namespace SaveRefreshToken {
  export type Input = {
    userId: string
    token: string
    expirationDate: string
  }

  export type Output = void
}