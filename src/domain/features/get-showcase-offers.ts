/*eslint-disable @typescript-eslint/no-explicit-any*/

export interface IGetShowcaseOffers {
  execute(input: IGetShowcaseOffers.Input): Promise<IGetShowcaseOffers.Output>
}

export namespace IGetShowcaseOffers {
  export type Input = {
    store_name: string;
  }

  export type Output = any
}