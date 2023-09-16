import { VerifiedTokenRequest } from "@/domain/models";
import { prisma } from "@/main/config";
import { Response } from "express";

/*eslint-disable @typescript-eslint/no-explicit-any*/
class GetResourceOffersController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const { resourcesId } = req.params as { resourcesId: string };

    try {
      const offers = await prisma.offer.findMany({
        where: {
          resources_id: resourcesId,
        }, include: {
          categories: {
            select: {
              category: {
                include: {
                  sub_categories: true
                }
              }
            }
          }
        }
      });
  
      return res.status(200).json({
        status: "success",
        message: "Ofertas encontradas",
        offers
      });
      
    } catch (error: any) {
      return res.status(400).json({
        status: "error",
        error: error.message,
        message: "Algo deu errado ao tentar atualizar a oferta"
      });
    }
  }
}

export const getResourceOffersController = new GetResourceOffersController();