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