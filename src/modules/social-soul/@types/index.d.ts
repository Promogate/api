export type CouponsResponse = {
  requestInfo: {
    status: string;
    message: string;
  },
  pagination: {
    page: number;
    size: number;
    totalSize: number;
    totalPage: number;
  },
  coupons: Coupon[]
}

export type Coupon = {
  id: number;
  description: string;
  code: string;
  discount: number;
  store: {
    id: number;
    name: string;
    image: string;
    link: string;
  },
  category: {
    id: number;
    name: string;
  },
  vigency: string;
  link: string;
}

export type StoresResponse = {
  requestInfo: {
    status: string;
    message: string;
  },
  pagination: {
    page: number;
    size: number;
    totalSize: number;
    totalPage: number;
  },
  coupons: Store[]
}

export type Store = {
  id: number;
  name: string;
  thumbnail: string;
  link: string;
  hasOffer: number,
  maxCommission: number;
  events: StoreEvent[]
}

export type StoreEvent = {
  event: string;
  eventType: string;
  fixedCommission: boolean;
  commission: number;
}

export type SingleOfferResponse = {
  requestInfo: {
    status: string;
    message: string;
  },
  pagination: {
    page: number;
    size: number;
    totalSize: number;
    totalPage: number;
  },
  offers: Offer[]
}

export type OffersResponse = {
  requestInfo: {
    status: string;
    message: string;
  },
  pagination: {
    page: number;
    size: number;
    totalSize: number;
    totalPage: number;
  },
  offers: Offer[]
}

export type Offer = {
  id: string;
  name: string;
  category: Record<string, unknown>;
  link: string;
  thumbnail: string;
  price: number;
  priceFrom?: number;
  discount?: number;
  installment: Record<string, unknown>;
  store: OfferStore;
}

export type OfferStore = {
  id: number;
  name: string;
  thumbnail: string;
  link: string;
  invisible: boolean;
  needPermission: boolean;
}

export type GetOffersParams = {
  size?: number;
  page?: number;
  sort?: string;
}