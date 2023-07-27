import { CreateProfileService } from '@/application/services';
import { ErrorHandler, HttpStatusCode } from '@/application/utils';
import { UserRepository } from '@/data/repositories';
import { CreateProfile } from '@/domain/features';
import { VerifiedTokenRequest } from '@/domain/models';
import { Response } from 'express';

class CreateProfileController {
  constructor(private readonly createProfileUseCase: CreateProfile) {}

  async handle(req: VerifiedTokenRequest, res: Response): Promise<Response> {
    const body = req.body as Input;
    try {
      const result = await this.createProfileUseCase.execute({ 
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
    } catch (error: any) {
      throw new ErrorHandler({
        statusCode: HttpStatusCode.INTERNAL_SERVER,
        name: 'CreateProfileControllerFailed',
        message: error.message
      })
    }
  }
}

type Input = {
  storeName: string;
  storeNameDisplay: string;
  storeImage: string;
}

const userRepository = new UserRepository()
const createProfileUseCase = new CreateProfileService(userRepository)
export const createProfileController = new CreateProfileController(createProfileUseCase);