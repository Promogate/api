export interface GetOffersClicks {
  execute: (input: GetOffersClicks.Input) => Promise<GetOffersClicks.Output>
}

export namespace GetOffersClicks {
  export type Input = {
    id: string
  }

  export type Output = {
    clicks: number
  }
}