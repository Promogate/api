export interface SaveRefreshTokenRepository {
  save: (input: SaveRefreshTokenRepository.Input) => Promise<SaveRefreshTokenRepository.Output>
}

export namespace SaveRefreshTokenRepository {
  export type Input = {
    userId: string
    token: string
    expirationDate: string
  }

  export type Output = void
}