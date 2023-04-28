import { UploadFileService } from '@/application/services';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ConvertCSVToJSONController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req;
    const uploadFileUseCase = container.resolve(UploadFileService)

    const { json } = await uploadFileUseCase.execute({ file: file as Express.Multer.File });
    return res.status(200).json(json)
  }
}

export const convertCSVToJSONController = new ConvertCSVToJSONController();