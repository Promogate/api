import { VerifiedTokenRequest } from "@/domain/models";
import { Response } from "express";
import { GetOffersParams } from "../@types";
import { ConnectSocialsoulService } from "../services";

class GetOffersByStoreIdController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const { storeId } = req.params as { storeId: string };
    const query = req.query as GetOffersParams;
    const { "x-source-id": sourceId } = req.headers as { "x-source-id": string };
    
    const getOffersByStoreIdService = new ConnectSocialsoulService({ sourceId });
    const result = await getOffersByStoreIdService.getOffersByStoreId({ storeId, params: query });

    return res.status(200).json(result);
  }
}

export const getOffersByStoreIdController = new GetOffersByStoreIdController();