import { VerifiedTokenRequest } from "@/domain/models";
import { prisma } from "@/main/config";
import { Response } from "express";

class MeCategoriesController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    try {

      const user = await prisma.user.findUnique({
        where: {
          id: req.user
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

      if (!user) {
        return res.status(401).json({
          status: "error",
          error: "Não autorizado",
          message: "Error ao buscar informações sobre o usuário"
        });
      }

      return res.status(200).json({
        status: "sucess",
        message: "Usuário encontrado",
        user
      });
    } catch (error: any) {
      return res.status(400).json({
        status: "error",
        error: error.message,
        message: "Error ao buscar informações sobre o usuário"
      });
    }
  }
}

export const meCategoriesController = new MeCategoriesController();