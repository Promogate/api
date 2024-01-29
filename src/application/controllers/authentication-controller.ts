import { CreateApiKey, CreateProfile, CreateUser, ISignIn } from "@/domain/features";
import { HttpServer } from "@/infra/http";
import { prisma } from "@/main/config";
import { verifyToken } from "../middlewares";
import { ErrorHandler, HttpStatusCode } from "../utils";
import { Request, Response } from "express";

export class AuthenticationController {
  constructor(
    httpServer: HttpServer,
    signInService: ISignIn,
    createUserService: CreateUser,
    createProfileService: CreateProfile,
    createApiKey: CreateApiKey
  ) {
    httpServer.on("post", "/users/signin", [], async function (request: Request, response: Response) {
      const output = await signInService.execute(request.body);
      return output;
    });

    httpServer.on("post", "/users/signup", [], async function (request: Request, response: Response) {
      const output = await createUserService.execute(request.body);
      return output;
    });

    httpServer.on("post", "/users/:id/profile/create", [verifyToken], async function (request: Request, response: Response) {
      const output = await createProfileService.execute({ ...request.body, userId: request.params.id });
      return output;
    });

    httpServer.on("put", "/profile/:id/update", [verifyToken], async function (request: Request, response: Response) {
      const loadedProfileByID = await prisma.userProfile.findUnique({ where: { id: request.params.id } });
      if (loadedProfileByID?.store_name === request.body.store_name) {
        const output = await prisma.userProfile.update({
          where: {
            id: request.params.id
          },
          data: {
            lomadee_source_id: request.body?.lomadeeSourceId,
            store_name: request.body?.store_name,
            store_name_display: request.body?.store_name_display,
            store_image: request.body?.store_image,
            social_media: {
              upsert: {
                create: {
                  facebook: request.body?.facebook,
                  instagram: request.body?.instagram,
                  whatsapp: request.body?.whatsapp,
                  telegram: request.body?.telegram,
                  twitter: request.body?.twitter,
                },
                update: {
                  facebook: request.body?.facebook,
                  instagram: request.body?.instagram,
                  whatsapp: request.body?.whatsapp,
                  telegram: request.body?.telegram,
                  twitter: request.body?.twitter,
                }
              }
            }
          },
          include: {
            social_media: true,
          }
        });

        return output;
      }
      if (request.body.store_name) {
        const findStoreByName = await prisma.userProfile.findUnique({ where: { store_name: request.body.store_name } });
        if (findStoreByName) {
          throw new ErrorHandler({
            name: "ProfileAlreadyExists",
            message: "Identificador único de perfil já está sendo utilizado. Tente outro.",
            statusCode: HttpStatusCode.FORBIDDEN
          });
        }
      }
      const output = await prisma.userProfile.update({
        where: {
          id: request.params.id
        },
        data: {
          lomadee_source_id: request.body?.lomadeeSourceId,
          store_name: request.body?.store_name,
          store_name_display: request.body?.store_name_display,
          store_image: request.body?.store_image,
          social_media: {
            upsert: {
              create: {
                facebook: request.body?.facebook,
                instagram: request.body?.instagram,
                whatsapp: request.body?.whatsapp,
                telegram: request.body?.telegram,
                twitter: request.body?.twitter,
              },
              update: {
                facebook: request.body?.facebook,
                instagram: request.body?.instagram,
                whatsapp: request.body?.whatsapp,
                telegram: request.body?.telegram,
                twitter: request.body?.twitter,
              }
            }
          }
        },
        include: {
          social_media: true,
        }
      });

      return output;
    });

    httpServer.on("put", "/profile/:id/update", [verifyToken], async function (request: Request, response: Response) {
      try {
        const userId = request.params.user;
        const output = await prisma.user.findUnique({
          where: {
            id: userId
          }, select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            user_profile: {
              include: {
                resources: true,
                social_media: {
                  select: {
                    facebook: true,
                    instagram: true,
                    telegram: true,
                    twitter: true,
                    whatsapp: true,
                  }
                },
              },
            }
          }
        });
        if (!output) {
          throw new ErrorHandler({
            name: "UserNotFound",
            message: "Usuário não encontrado",
            statusCode: HttpStatusCode.FORBIDDEN
          });
        }

        return output;
      } catch {
        throw new ErrorHandler({
          name: "TokenNotFound",
          message: "Token inválido ou não encontrado",
          statusCode: HttpStatusCode.FORBIDDEN
        });
      }
    });

    httpServer.on("put", "/profile/:id/update", [verifyToken], async function (request: Request, response: Response) {
      try {
        const output = await prisma.user.findUnique({
          where: {
            id: request.params.user
          }, select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            user_profile: {
              include: {
                resources: {
                  select: {
                    categories: true
                  }
                }
              }
            }
          }
        });
        if (!output) {
          throw new ErrorHandler({
            name: "FailedToGetUserInformations",
            message: "Error ao buscar informações sobre o usuário",
            statusCode: HttpStatusCode.NOT_FOUND
          });
        }
  
        return output;
      } catch (error: any) {
        throw new ErrorHandler({
          name: "Failed",
          message: "Usuário não encontrado",
          statusCode: HttpStatusCode.FORBIDDEN
        });
      }
    });

    httpServer.on("post", "/api-keys/create", [verifyToken], async function (request: Request, response: Response) {
      const output = await createApiKey.execute(request.body);
      return output;
    });

    httpServer.on("get", "/users/me", [verifyToken], async function (request: Request & { user?: string }, response: Response) {
      const { user: id } = request;
      const user = await prisma.user.findUnique({
        where: {
          id: id
        },
        select: {
          id: true,
          email: true,
          agree_with_policies: true,
          name: true,
          created_at: true,
          user_profile: {
            include: {
              resources: {
                select: {
                  id: true,
                }
              },

            }
          }
        }
      });
      if (!user) {
        throw new ErrorHandler({
          name: "UserNotFound",
          message: "Usuário não encontrado",
          statusCode: HttpStatusCode.UNAUTHORIZED
        });
      }
      const userSubscription = await prisma.userSubscription.findUnique({
        where: { userId: id }
      });
      const output = {...user, userSubscription: userSubscription};
      
      return output;
    });
  }
}