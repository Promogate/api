import { Offer, UserProfile } from "@prisma/client";

export interface GetOffersFromStore {
  execute(input: GetOffersFromStore.Input): Promise<GetOffersFromStore.Output>
}

export namespace GetOffersFromStore {
  export type Input = {
    storeName: string
  }

  export type Output = (UserProfile & {
    resources: {
        offers: (Offer & {
            _count: {
                offer_clicks: number;
            };
        })[];
    } | null;
})
}