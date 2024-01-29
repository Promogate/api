import { IGetProfile } from "@/domain/features";
import { HttpServer } from "@/infra/http";
import { prisma } from "@/main/config";
import { verifyToken } from "../middlewares";
import { ErrorHandler, HttpStatusCode } from "../utils";
import { Request, Response } from "express";

export class AnalyticsController {
  constructor (
    httpServer: HttpServer,
    getProfile: IGetProfile
  ) {
    httpServer.on("get", "/redirect/offer/with-query", [], async function (request: Request, response: Response) {
      try {
        const output = await prisma.offer.findFirst({
          where: {
            short_link: request.query.shortLink as string
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

    httpServer.on("get", "/profile/:id", [verifyToken], async function (request: Request, response: Response) {
      const output = await getProfile.execute({ id: request.params.id });
      return output;
    });
  }
}