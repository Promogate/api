import { CreateProfileService } from '@/application/services';
import { VerifiedTokenRequest } from '@/domain/models';
import { Response } from 'express';
import { container } from 'tsyringe';

type Body = {
  storeName: string;
  storeNameDisplay: string;
  storeImage: string;
}

/*eslint-disable @typescript-eslint/no-explicit-any*/
class CreateProfileController {
  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const body = req.body as Body;
    const service = container.resolve(CreateProfileService);
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

export const createProfileController = new CreateProfileController();