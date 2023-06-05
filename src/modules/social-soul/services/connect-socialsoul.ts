import { SOCIALSOUL_APP_ID, TS_NODE_ENV } from '@/main/config';
import {
  CouponsResponse,
  GetOffersParams,
  OffersResponse,
  StoresResponse
} from '@/modules/social-soul/@types';
import axios, { AxiosInstance } from 'axios';

export namespace ConnectSocialsoul {
  export type Input = {
    sourceId: string;
  }

  export type GetOffers = {
    storeId: string;
    params?: GetOffersParams
  }
}

export class ConnectSocialsoulService {
  private readonly appId: string;
  private readonly apiUrl: string;
  private readonly apiClient: AxiosInstance;
  private readonly sourceId: string;

  constructor({ sourceId }: ConnectSocialsoul.Input) {
    this.appId = SOCIALSOUL_APP_ID
    this.apiUrl = TS_NODE_ENV === undefined ? `https://api.lomadee.com` : `http://sandbox-api.lomadee.com`
    this.sourceId = sourceId
    this.apiClient = axios.create({
      baseURL: this.apiUrl
    })
  }

  async getCoupons(): Promise<CouponsResponse> {
    const { data } = await this.apiClient.get<CouponsResponse>(`/v2/${this.appId}/coupon/_all`, {
      params: {
        sourceId: this.sourceId
      }
    })

    return data
  }

  async getStores(): Promise<StoresResponse> {
    const { data } = await this.apiClient.get<StoresResponse>(`/v3/${this.appId}/store/_all`, {
      params: {
        sourceId: this.sourceId
      }
    })

    return data
  }

  async getOffersByStoreId({ storeId, params }: ConnectSocialsoul.GetOffers): Promise<OffersResponse> {
    const { data } = await this.apiClient.get<OffersResponse>(`/v3/${this.appId}/offer/_store/${storeId}`, {
      params: {
        sourceId: this.sourceId,
        ...params
      }
    })

    return data
  }
}