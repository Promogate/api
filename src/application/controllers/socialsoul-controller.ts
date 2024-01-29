import { HttpServer } from "@/infra/http";
import { ConnectSocialsoulService } from "@/modules/social-soul/services";
import { verifyToken } from "../middlewares";
import { Request, Response } from "express";

export class SocialSoulController {
  constructor(
    httpServer: HttpServer,
  ) {

    httpServer.on("get", "/social-soul/social-soul/coupons", [verifyToken], async function (request: Request, response: Response) {
      const { "x-source-id": sourceId } = request.headers;
      const socialSoulService = new ConnectSocialsoulService({ sourceId: sourceId as string });  
      const output = await  socialSoulService.getCoupons();
      return output;
    });

    httpServer.on("get", "/social-soul/social-soul/stores", [verifyToken], async function (request: Request, response: Response) {
      const { "x-source-id": sourceId } = request.headers;
      const socialSoulService = new ConnectSocialsoulService({ sourceId: sourceId as string });  
      const output = await  socialSoulService.getStores();
      return output;
    });

    httpServer.on("get", "/social-soul/offers/store/:storeId", [verifyToken], async function (request: Request, response: Response) {
      const { "x-source-id": sourceId } = request.headers;
      const socialSoulService = new ConnectSocialsoulService({ sourceId: sourceId as string });  
      const output = await  socialSoulService.getOffersByStoreId({ storeId: request.params.storeId, params: request.query });
      return output;
    });

    httpServer.on("get", "/social-soul/offers/store/:storeId", [verifyToken], async function (request: Request, response: Response) {
      const { "x-source-id": sourceId } = request.headers;
      const socialSoulService = new ConnectSocialsoulService({ sourceId: sourceId as string });  
      const output = await  socialSoulService.getOffersByStoreId({ storeId: request.params.storeId, params: request.query });
      return output;
    });

    httpServer.on("get", "/social-soul/offer/:offerId", [verifyToken], async function (request: Request, response: Response) {
      const { "x-source-id": sourceId } = request.headers;
      const socialSoulService = new ConnectSocialsoulService({ sourceId: sourceId as string });  
      const output = await  socialSoulService.getOfferById({ offerId: request.params.offerId, params: request.query as { storeId: string } });
      return output;
    });
  }
}