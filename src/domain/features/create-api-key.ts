export interface CreateApiKey {
  execute: () => Promise<CreateApiKey.Output>
}

export namespace CreateApiKey {
  export type Output = {
    key: string
  }
}