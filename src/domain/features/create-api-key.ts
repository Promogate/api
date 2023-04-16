export interface CreateApiKey {
  execute: (input: CreateApiKey.Input) => Promise<CreateApiKey.Output>
}

export namespace CreateApiKey {
  export type Input = {
    userId: string
  }

  export type Output = {
    key: string
  }
}