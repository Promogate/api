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

export interface FindRefreshTokenRepository {
  find: (input: FindRefreshTokenRepository.Input) => Promise<FindRefreshTokenRepository.Output>
}

export namespace FindRefreshTokenRepository {
  export type Input = {
    refreshToken: string
  }

  export type Output = {
    id: string
    refreshToken: string
    expirationDate: string
  } | null
}

export interface UpdateRefreshTokenRepository {
  update: (input: UpdateRefreshTokenRepository.Input) => Promise<UpdateRefreshTokenRepository.Output>
}

export namespace UpdateRefreshTokenRepository {
  export type Input = {
    userId: string
    refreshToken: string
    expirationDate: string
  }

  export type Output = void
}