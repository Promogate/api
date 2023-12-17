/*eslint-disable @typescript-eslint/no-explicit-any*/

export interface GetStoreData {
  execute(input: GetStoreData.Input): Promise<GetStoreData.Output>
}

export namespace GetStoreData {
  export type Input = {
    store_name: string
  }

  export type Output = any
}