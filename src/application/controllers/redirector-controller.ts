import { HttpServer } from "@/infra/http";
import { ErrorHandler, HttpStatusCode } from "../utils";
import { prisma } from "@/main/config";
import { CreateRedirectorShortlink, RedirectorLink } from "@/domain/features";
import { verifyToken } from "../middlewares";

export class RedirectorController {
  constructor(
    httpServer: HttpServer,
    createRedirectorShortlinkService: CreateRedirectorShortlink,
    redirectorLinkService: RedirectorLink
  ) {

    httpServer.on("post", "/redirector/create", [verifyToken], async function (params: any, body: any) {
      try {
        const { id } = await prisma.redirector.create({
          data: {
            title: body.title,
            resources_id: body.resourcesId,
            description: body.description,
            redirectorLink: "",
            timesClicked: 0
          }
        });

        const data = await createRedirectorShortlinkService.execute({
          redirectorId: id,
          destinationLink: `https://api.promogate.app/redirector/${id}`,
          type: "redirector"
        });

        const result = await prisma.redirector.update({
          where: { id },
          data: { redirectorLink: data?.shortLink }
        });

        return result;

      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.BAD_REQUEST,
          name: "FailedToCreateNewRedirector",
          message: error
        });
      }
    });

    httpServer.on("post", "/redirector/:redirectorId/group/create", [verifyToken], async function (params: any, body: any) {
      try {
        const result = await prisma.group.create({
          data: {
            title: body.title,
            destination_link: body.destinationLink,
            limit: Number(body.limit),
            members: Number(body.members),
            redirector: {
              connect: {
                id: params.params.redirectorId
              }
            }
          }
        });

        return result;
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.BAD_REQUEST,
          name: "FailedToCreateNewRedirector",
          message: error
        });
      }
    });

    httpServer.on("get", "/redirector/find-by-id/:redirectorId", [verifyToken], async function (params: any, body: any) {
      try {
        const output = await prisma.redirector.findFirst({
          where: {
            id: params.params.redirectorId
          }, include: {
            groups: true
          }
        });
        console.log(output);
        return output;
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          name: "FailedToDeleteOffer",
          message: error.message
        });
      }
    });

    httpServer.on("get", "/redirector/:redirectorId", [verifyToken], async function (params: any, body: any) {
      try {
        const output = await redirectorLinkService.execute({ redirectorId: params.params.redirectorId });
        return output;
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          name: "FailedToDeleteOffer",
          message: error.message
        });
      }
    });
  }
}