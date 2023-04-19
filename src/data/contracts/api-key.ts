
export interface FindAPIKeyRepository {
  find: (input: FindAPIKeyRepository.Input) => Promise<FindAPIKeyRepository.Output>
}

export namespace FindAPIKeyRepository {
  export type Input = {
    apiKey: string
  }

  export type Output = {
    id: string;
    key: string;
    expiration_date: Date;
    userId: string;
}
}