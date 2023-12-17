import { HttpServer } from "@/infra/http";
import { ConnectSocialsoulService } from "@/modules/social-soul/services";
import { verifyToken } from "../middlewares";

export class SocialSoulController {
  constructor(
    httpServer: HttpServer,
  ) {

    httpServer.on("get", "/social-soul/social-soul/coupons", [verifyToken], async function (params: any, body: any) {
      const { "x-source-id": sourceId } = params.headers;
      const socialSoulService = new ConnectSocialsoulService({ sourceId });  
      const output = await  socialSoulService.getCoupons();
      return output;
    });

    httpServer.on("get", "/social-soul/social-soul/stores", [verifyToken], async function (params: any, body: any) {
      const { "x-source-id": sourceId } = params.headers;
      const socialSoulService = new ConnectSocialsoulService({ sourceId });  
      const output = await  socialSoulService.getStores();
      return output;
    });

    httpServer.on("get", "/social-soul/offers/store/:storeId", [verifyToken], async function (params: any, body: any) {
      const { "x-source-id": sourceId } = params.headers;
      const socialSoulService = new ConnectSocialsoulService({ sourceId });  
      const output = await  socialSoulService.getOffersByStoreId({ storeId: params.params.storeId, params: params.query });
      return output;
    });

    httpServer.on("get", "/social-soul/offers/store/:storeId", [verifyToken], async function (params: any, body: any) {
      const { "x-source-id": sourceId } = params.headers;
      const socialSoulService = new ConnectSocialsoulService({ sourceId });  
      const output = await  socialSoulService.getOffersByStoreId({ storeId: params.params.storeId, params: params.query });
      return output;
    });

    httpServer.on("get", "/social-soul/offer/:offerId", [verifyToken], async function (params: any, body: any) {
      const { "x-source-id": sourceId } = params.headers;
      const socialSoulService = new ConnectSocialsoulService({ sourceId });  
      const output = await  socialSoulService.getOfferById({ offerId: params.params.offerId, params: params.query });
      return output;
    });
  }
}