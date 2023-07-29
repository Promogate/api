import { VerifiedTokenRequest } from '@/domain/models';
import { prisma } from '@/main/config';
import { Response } from 'express';

class GetUserInfoController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    try {
      const userId = req.user;

      const user = await prisma.user.findUnique({
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

      if (!user) {
        return res.status(401).json({ message: 'User not found!' })
      }

      return res.status(200).json({
        status: 'success',
        user
      });
    } catch {
      return res.status(401).json({ message: 'Token is missing' })
    }
  }
}

export const meController = new GetUserInfoController();