import { SOCIALSOUL_API_URL, SOCIALSOUL_APP_ID } from '@/main/config';
import {
  CouponsResponse,
  GetOffersParams,
  OffersResponse,
  SingleOfferResponse,
  StoresResponse
} from '@/modules/social-soul/@types';
import axios, { AxiosInstance } from 'axios';

export namespace ConnectSocialsoul {
  export type Input = {
    sourceId: string;
  }

  export type GetOffers = {
    storeId: string;
    params?: GetOffersParams;
  }

  export type GetOfferById = {
    offerId: string;
    params: {
      storeId: string;
    }
  }
}

export class ConnectSocialsoulService {
  private readonly appId: string;
  private readonly apiUrl: string;
  private readonly apiClient: AxiosInstance;
  private readonly sourceId: string;

  constructor({ sourceId }: ConnectSocialsoul.Input) {
    this.appId = SOCIALSOUL_APP_ID
    this.apiUrl = SOCIALSOUL_API_URL
    this.sourceId = sourceId
    this.apiClient = axios.create({
      baseURL: this.apiUrl,
      headers: {
        "Accept": "*/*, application/json, text/plain",
      }
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
    try {
      const { data } = await this.apiClient.get<StoresResponse>(`/v3/${this.appId}/store/_all`, {
        params: {
          sourceId: this.sourceId
        }
      })
      return data
    } catch (e: any) {
      throw new Error(e.message)
    }
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

  async getOfferById({ offerId, params }: ConnectSocialsoul.GetOfferById): Promise<SingleOfferResponse> {
    const { data } = await this.apiClient.get<SingleOfferResponse>(`/v3/${this.appId}/offer/_id/${offerId}`, {
      params: {
        sourceId: this.sourceId,
        ...params
      }
    })

    return data
  }
}