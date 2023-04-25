export interface AddOfferClickRepository {
  addClick: (input: AddOfferClickRepository.Input) => Promise<AddOfferClickRepository.Output>
}

export namespace AddOfferClickRepository {
  export type Input = {
    id: string
  }

  export type Output = void
}

export interface GetOffersClicksRepository {
  getClicks: (input: GetOffersClicksRepository.Input) => Promise<GetOffersClicksRepository.Output>
}

export namespace GetOffersClicksRepository {
  export type Input = {
    resourceId: string
  }

  export type Output = {
    clicks: number
  }
}