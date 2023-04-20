export interface CreateApiKey {
  execute: (input: CreateApiKey.Input) => Promise<CreateApiKey.Output>
}

export namespace CreateApiKey {
  export type Input = {
    id: string
  }

  export type Output = {
    key: string
  }
}