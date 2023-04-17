export interface SaveRefreshToken {
  create: (input: SaveRefreshToken.Input) => Promise<SaveRefreshToken.Output>
}

export namespace SaveRefreshToken {
  export type Input = {
    userId: string
  }

  export type Output = void
}