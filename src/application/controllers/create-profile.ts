import { CreateProfileService } from '@/application/services';
import { VerifiedTokenRequest } from '@/domain/models';
import { Response } from 'express';

class CreateProfileController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const body = req.body as Input;
    const service = new CreateProfileService()
    const result = await service.execute({ 
      storeName: body.storeName,
      storeNameDisplay: body.storeNameDisplay,
      storeImage: body.storeImage,
      userId: req.user as string
     })

     return res.status(200).json({
      status: 'succcess',
      message: 'Perfil criado com sucesso!',
      data: result
     })
  }
}

type Input = {
  storeName: string;
  storeNameDisplay: string;
  storeImage: string;
}

export const createProfileController = new CreateProfileController();