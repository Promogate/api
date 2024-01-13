import { CreateApiKey, CreateProfile, CreateUser, ISignIn } from "@/domain/features";
import { HttpServer } from "@/infra/http";
import { prisma } from "@/main/config";
import { verifyToken } from "../middlewares";
import { ErrorHandler, HttpStatusCode } from "../utils";

export class AuthenticationController {
  constructor(
    httpServer: HttpServer,
    signInService: ISignIn,
    createUserService: CreateUser,
    createProfileService: CreateProfile,
    createApiKey: CreateApiKey
  ) {
    httpServer.on("post", "/users/signin", [], async function (params: any, body: any) {
      const output = await signInService.execute(body);
      return output;
    });

    httpServer.on("post", "/users/signup", [], async function (params: any, body: any) {
      const output = await createUserService.execute(body);
      return output;
    });

    httpServer.on("post", "/users/:id/profile/create", [verifyToken], async function (params: any, body: any) {
      const output = await createProfileService.execute({ ...body, userId: params.params.id });
      return output;
    });

    httpServer.on("put", "/profile/:id/update", [verifyToken], async function (params: any, body: any) {
      const loadedProfileByID = await prisma.userProfile.findUnique({ where: { id: params.params.id } });
      if (loadedProfileByID?.store_name === body.store_name) {
        const output = await prisma.userProfile.update({
          where: {
            id: params.params.id
          },
          data: {
            lomadee_source_id: body?.lomadeeSourceId,
            store_name: body?.store_name,
            store_name_display: body?.store_name_display,
            store_image: body?.store_image,
            social_media: {
              upsert: {
                create: {
                  facebook: body?.facebook,
                  instagram: body?.instagram,
                  whatsapp: body?.whatsapp,
                  telegram: body?.telegram,
                  twitter: body?.twitter,
                },
                update: {
                  facebook: body?.facebook,
                  instagram: body?.instagram,
                  whatsapp: body?.whatsapp,
                  telegram: body?.telegram,
                  twitter: body?.twitter,
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
      if (body.store_name) {
        const findStoreByName = await prisma.userProfile.findUnique({ where: { store_name: body.store_name } });
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
          id: params.params.id
        },
        data: {
          lomadee_source_id: body?.lomadeeSourceId,
          store_name: body?.store_name,
          store_name_display: body?.store_name_display,
          store_image: body?.store_image,
          social_media: {
            upsert: {
              create: {
                facebook: body?.facebook,
                instagram: body?.instagram,
                whatsapp: body?.whatsapp,
                telegram: body?.telegram,
                twitter: body?.twitter,
              },
              update: {
                facebook: body?.facebook,
                instagram: body?.instagram,
                whatsapp: body?.whatsapp,
                telegram: body?.telegram,
                twitter: body?.twitter,
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

    httpServer.on("put", "/profile/:id/update", [verifyToken], async function (params: any, body: any) {
      try {
        const userId = params.user;
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

    httpServer.on("put", "/profile/:id/update", [verifyToken], async function (params: any, body: any) {
      try {
        const output = await prisma.user.findUnique({
          where: {
            id: params.user
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

    httpServer.on("post", "/api-keys/create", [verifyToken], async function (params: any, body: any) {
      const output = await createApiKey.execute(params);
      return output;
    });

    httpServer.on("get", "/users/me/:id", [verifyToken], async function (params: any, body: any) {
      const output = await prisma.user.findFirst({
        where: {
          id: params.params.id
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
              }
            }
          }
        }
      });
      
      return output;
    });
  }
}