import { Offer } from '@prisma/client';

export interface ListOffers {
  execute: (input: ListOffers.Input) => Promise<ListOffers.Output>
}

export namespace ListOffers {
  export type Input = { api_key: string };
  export type Output = Offer[];
}