import { Offer } from '@prisma/client'

export interface ISearchByWord {
  execute(input: ISearchByWord.Input): Promise<ISearchByWord.Output>
}

export namespace ISearchByWord {
  export type Input = {
    api_key: string,
    word: string
  }

  export type Output = Offer[]
}