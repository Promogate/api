export interface ListAPIKeys {
  execute: (input: ListAPIKeys.Input) => Promise<ListAPIKeys.Output>
}

export namespace ListAPIKeys {
  export type Input = {
    userId: string
  }

  export type Output = Array<{
    id: string
    key: string
    expirationDate: string
  }>
}