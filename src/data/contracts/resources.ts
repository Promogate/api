import { Offer } from '@prisma/client';

/*eslint-disable @typescript-eslint/no-explicit-any*/
export interface SaveOfferRepository {
  saveOffer: (input: SaveOfferRepository.Input) => Promise<SaveOfferRepository.Output>
}

export namespace SaveOfferRepository {
  export type Input = {
    resourceId: string;
    image: string;
    title: string;
    oldPrice?: string;
    price: string;
    destinationLink: string;
    storeImage: string;
    storeName: string;
    description?: string;
    expirationDate: string;
    shortLink: string;
    isFeatured?: boolean;
    isOnShowcase?: boolean;
    isFreeShipping?: boolean;
  }

  export type Output = void
}

export interface SaveOffersFromCSVRepository {
  saveOffersFromCSV: (input: SaveOffersFromCSVRepository.Input) => Promise<SaveOffersFromCSVRepository.Output>
}

export namespace SaveOffersFromCSVRepository {
  export type Input = {
    offers: Array<{
      resources_id: string;
      image: string;
      title: string;
      oldPrice?: string;
      price: string;
      destination_link: string;
      store_image: string;
      expiration_date: string;
      short_link: string;
    }>,
    resource_id: string
  }

  export type Output = void
}

export interface ListOffersRepository {
  listOffers: (input: ListOffersRepository.Input) => Promise<ListOffersRepository.Output>
}

export namespace ListOffersRepository {
  export type Input = {
    user_id: string;
    per_page?: number;
    page?: number;
  }
  export type Output = {
    page: number;
    per_page: number;
    total_offers: number;
    total_featured_offers: number;
    total_showcase_offers: number;
    offers: Offer[];
  }
}

export interface FindOfferByIdRepository {
  findOfferById: (input: FindOfferByIdRepository.Input) => Promise<FindOfferByIdRepository.Output>
}

export namespace FindOfferByIdRepository {
  export type Input = {
    id: string,
  }

  export type Output = {
    id: string,
    title: string,
    image: string,
    old_price: string | null,
    price: string,
    destination_link: string,
    store_image: string | null,
    expiration_date: string | null,
    resourceId: string
  }
}

export interface FindOffersByAPIKeyRepository {
  findOffersByAPIKey: (input: FindOffersByAPIKeyRepository.Input) => Promise<FindOffersByAPIKeyRepository.Ouput>
}

export namespace FindOffersByAPIKeyRepository {
  export type Input = {
    api_key: string
  }

  export type Ouput = Offer[]
}

export interface ISearchOfferByWord {
  searchByWord(input: ISearchOfferByWord.Input): Promise<ISearchOfferByWord.Output>
}

export namespace ISearchOfferByWord {
  export type Input = {
    api_key: string,
    word: string
  }

  export type Output = Offer[]
}

export interface IGetShowcaseOffersRepo {
  getOffers(input: IGetShowcaseOffersRepo.Input): Promise<IGetShowcaseOffersRepo.Output>
}

export namespace IGetShowcaseOffersRepo {
  export type Input = {
    store_name: string
  }

  export type Output = any
}

export interface IGetStoreDataRepo {
  getStore(input: IGetStoreDataRepo.Input): Promise<IGetStoreDataRepo.Output>
}

export namespace IGetStoreDataRepo {
  export type Input = {
    store_name: string
  }

  export type Output = any
}