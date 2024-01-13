
export interface GetOffersWithClicksCount {
  execute: (input: GetOffersWithClicksCount.Input) => Promise<GetOffersWithClicksCount.Output>
}

export namespace GetOffersWithClicksCount {
  export type Input = {
    user_id: string
  }

  export type Output = {
    offerClicks: number
  }
}