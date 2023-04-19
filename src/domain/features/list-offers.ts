import { Offer } from '@prisma/client';

export interface ListOffers {
  execute: (input: ListOffers.Input) => Promise<ListOffers.Output>
}

export namespace ListOffers {
  export type Input = { apiKey: string };
  export type Output = Offer[];
}