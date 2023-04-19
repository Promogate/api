import { AccessKeys } from '@prisma/client'

export interface FindAPIKeyRepository {
  find: (input: FindAPIKeyRepository.Input) => Promise<FindAPIKeyRepository.Output>
}

export namespace FindAPIKeyRepository {
  export type Input = {
    apiKey: string
  }

  export type Output = AccessKeys | null
}