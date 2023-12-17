import { IGetProfile } from "@/domain/features";
import { HttpServer } from "@/infra/http";
import { prisma } from "@/main/config";
import { verifyToken } from "../middlewares";
import { ErrorHandler, HttpStatusCode } from "../utils";

export class AnalyticsController {
  constructor (
    httpServer: HttpServer,
    getProfile: IGetProfile
  ) {
    httpServer.on("get", "/redirect/offer/with-query", [], async function (params: any, body: any) {
      try {
        const output = await prisma.offer.findFirst({
          where: {
            short_link: params.query.shortLink
          },
          include: {
            resources: {
              include: {
                analytics: {
                  select: {
                    id: true
                  }
                }
              }
            }
          }
        });
    
        if (!output) {
          throw new ErrorHandler({
            statusCode: HttpStatusCode.INTERNAL_SERVER,
            name: "OfferNotFound",
            message: "Nenhum produto foi encontrado"
          });
        }
    
        return output;
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          name: "FailedToRedirectOffer",
          message: error.message
        });
      }
    });

    httpServer.on("get", "/profile/:id", [verifyToken], async function (params: any, body: any) {
      const output = await getProfile.execute(params);
      return output;
    });
  }
}