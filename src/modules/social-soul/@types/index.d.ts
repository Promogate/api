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