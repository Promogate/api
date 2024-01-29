import { HttpServer } from "@/infra/http";
import { ErrorHandler, HttpStatusCode } from "../utils";
import { prisma } from "@/main/config";
import { CreateRedirectorShortlink, RedirectorLink } from "@/domain/features";
import { verifyToken } from "../middlewares";
import { randomUUID } from "crypto";
import { Request, Response } from "express";

export class RedirectorController {
  constructor(
    httpServer: HttpServer,
    createRedirectorShortlinkService: CreateRedirectorShortlink,
    redirectorLinkService: RedirectorLink
  ) {

    httpServer.on("post", "/redirector/create", [verifyToken], async function (request: Request, response: Response) {
      try {
        const { id } = await prisma.redirector.create({
          data: {
            title: request.body.title,
            resources_id: request.body.resourcesId,
            description: request.body.description,
            redirectorLink: randomUUID(),
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

    httpServer.on("post", "/redirector/:redirectorId/group/create", [verifyToken], async function (request: Request, response: Response) {
      try {
        const result = await prisma.group.create({
          data: {
            title: request.body.title,
            destination_link: request.body.destinationLink,
            limit: Number(request.body.limit),
            members: Number(request.body.members),
            redirector: {
              connect: {
                id: request.params.redirectorId
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

    httpServer.on("get", "/redirector/find-by-id/:redirectorId", [verifyToken], async function (request: Request, response: Response) {
      try {
        const output = await prisma.redirector.findFirst({
          where: {
            id: request.params.redirectorId
          }, include: {
            groups: true
          }
        });
        return output;
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          name: "FailedToFindRedirector",
          message: error.message
        });
      }
    });

    httpServer.on("get", "/redirector/:redirectorId", [], async function (request: Request, response: Response) {
      try {
        const output = await redirectorLinkService.execute({ redirectorId: request.params.redirectorId });
        return output;
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          name: "FailedToRedirect",
          message: error.message
        });
      }
    });

    httpServer.on("delete", "/redirector/delete/:redirectorId", [], async function (request: Request, response: Response) {
      try {
        await prisma.redirector.delete({
          where: { id: request.params.redirectorId }
        });
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          name: "FailedToDeleteRedirector",
          message: error.message
        });
      }
    });

    httpServer.on("put", "/redirector/update/:redirectorId", [], async function (request: Request, response: Response) {
      try {
        await prisma.redirector.update({
          where: { id: request.params.redirectorId },
          data: request.body
        });
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          name: "FailedToUpdateRedirector",
          message: error.message
        });
      }
    });

    httpServer.on("put", "/redirector/group/:groupId", [], async function (request: Request, response: Response) {
      try {
        await prisma.group.update({
          where: { id: request.params.groupId },
          data: {
            limit: request.body.limit,
            members: request.body.members,
            destination_link: request.body.destinationLink,
            title: request.body.title
          }
        });
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          name: "FailedToUpdateGroup",
          message: error.message
        });
      }
    });

    httpServer.on("delete", "/redirector/group/:groupId", [], async function (request: Request, response: Response) {
      try {
        await prisma.group.delete({
          where: { id: request.params.groupId }
        });
      } catch (error: any) {
        throw new ErrorHandler({
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          name: "FailedToDeleteGroup",
          message: error.message
        });
      }
    });
  }
}