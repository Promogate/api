export interface AddOfferClickRepository {
  addClick: (input: AddOfferClickRepository.Input) => Promise<AddOfferClickRepository.Output>
}

export namespace AddOfferClickRepository {
  export type Input = {
    id: string
  }

  export type Output = void
}