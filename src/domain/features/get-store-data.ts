/*eslint-disable @typescript-eslint/no-explicit-any*/

export interface IGetStoreData {
  execute(input: IGetStoreData.Input): Promise<IGetStoreData.Output>
}

export namespace IGetStoreData {
  export type Input = {
    store_name: string
  }

  export type Output = any
}