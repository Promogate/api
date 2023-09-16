import { CreateShortlinkService } from "@/application/services";
import { ErrorHandler, HttpStatusCode } from "@/application/utils";
import { ResourcesRepository } from "@/data/repositories/prisma";
import { CreateOffer } from "@/domain/features";
import { VerifiedTokenRequest } from "@/domain/models";
import { Response } from "express";
import { CreateOfferUseCase } from "../usecases";

class CreateOfferController {
  constructor(private readonly createOfferUseCase: CreateOffer) {}

  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const { resourceId } = req.params as { resourceId: string };
    const body = req.body as Input;
    try {
      await this.createOfferUseCase.execute({...body, resourceId });
      return res.status(HttpStatusCode.OK).json({ message: "Oferta adicionada com sucesso" });
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: HttpStatusCode.BAD_REQUEST,
        name: error.name,
        message: error.stack
      });
    }
  }
}

type Input = {
  image: string;
  title: string;
  oldPrice?: string;
  price: string;
  destinationLink: string;
  storeImage?: string;
  storeName: string;
  description?: string;
  expirationDate?: string;
  isFeatured?: boolean;
  isOnShowcase?: boolean;
  isFreeShipping?: boolean;
}

const resourcesRepository = new ResourcesRepository();
const shortLinkUseCase = new CreateShortlinkService();
const createOfferUseCase = new CreateOfferUseCase(resourcesRepository, shortLinkUseCase);
export const createOfferController = new CreateOfferController(createOfferUseCase);