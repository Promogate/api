import { UploadOffersFromCSVService } from '@/application/services';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UploadOffersFromCSVConstroller {
  async handle(req: Request & { user?: string }, res: Response): Promise<Response> {
    const { file } = req;
    const uploadOffersFromCSVService = container.resolve(UploadOffersFromCSVService)

    const { json } = await uploadOffersFromCSVService.execute({ 
      file: file as Express.Multer.File,
      user_id: req.user as string
    });
    
    return res.status(200).json(json)
  }
}

export const uploadOffersFromCSVConstroller = new UploadOffersFromCSVConstroller();