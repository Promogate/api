import { SOCIALSOUL_APP_ID } from '@/main/config';
import { CouponsResponse } from '@/modules/social-soul/@types';
import axios, { AxiosInstance } from 'axios';
import { injectable } from 'tsyringe';

export namespace ConnectSocialsoul {
  export type Input = {
    sourceId: string;
  }
}

@injectable()
export class ConnectSocialsoulService {
  private readonly appId: string;
  private readonly apiUrl: string;
  private readonly apiClient: AxiosInstance;
  private readonly sourceId: string;

  constructor({ sourceId }: ConnectSocialsoul.Input) {
    this.appId = SOCIALSOUL_APP_ID
    this.apiUrl = process.env.TS_NODE_ENV === undefined ? `https://api.lomadee.com/${this.appId}` : `http://sandbox-api.lomadee.com/${this.appId}`
    this.sourceId = sourceId
    this.apiClient = axios.create({
      baseURL: this.apiUrl
    })
  }

  async getCoupons(): Promise<CouponsResponse> {
    const { data } = await this.apiClient.get<CouponsResponse>('/coupon/_all',  {
      params: {
        sourceId: this.sourceId
      }
    })

    return data
  }
}