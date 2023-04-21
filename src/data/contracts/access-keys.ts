import { AccessKeys } from '@prisma/client'

export interface SaveAccessKeysRepository {
  save: (input: SaveAccessKeysRepository.Input) => Promise<SaveAccessKeysRepository.Output>
}

export namespace SaveAccessKeysRepository {
  export type Input = {
    userId: string,
    key: string,
    expirationDate: string
  }

  export type Output = AccessKeys
}

export interface ListAPIKeysRepository {
  list: (input: ListAPIKeysRepository.Input) => Promise<ListAPIKeysRepository.Output>
}

export namespace ListAPIKeysRepository {
  export type Input = {
    userId: string
  }

  export type Output = Array<{
    id: string
    key: string
    expiration_date: string
  }>
}
