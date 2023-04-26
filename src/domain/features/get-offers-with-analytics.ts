export interface GetOffersWithAnalytics {
  execute: (input: GetOffersWithAnalytics.Input) => Promise<GetOffersWithAnalytics.Output>
}

export namespace GetOffersWithAnalytics {
  export type Input = {
    id: string
  }

  export type Output = any
}