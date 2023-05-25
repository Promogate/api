import { Offer } from '@prisma/client';

export interface ListOffers {
  execute: (input: ListOffers.Input) => Promise<ListOffers.Output>
}

export namespace ListOffers {
  export type Input = { 
    user_id: string,
    page?: number;
    perPage?: number;
   };
  export type Output = {
    page: number;
    per_page: number;
    offers: Offer[];
  }
}