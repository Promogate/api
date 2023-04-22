export interface DeleteAPIKey {
  execute: (input: DeleteAPIKey.Input) => Promise<DeleteAPIKey.Output>
}

export namespace DeleteAPIKey {
  export type Input = {
    id: string
  }

  export type Output = void
}