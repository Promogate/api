import {
  FindUserByIdIncludingResourcesRepository,
  SaveOffersFromCSVRepository
} from '@/data/contracts';
import { ICSVFile, UploadOffersFromCSV } from '@/domain/features';
import { container, inject, injectable } from 'tsyringe';
import { ConvertCSVToJSONService } from './convert-csv-to-json';

@injectable()
export class UploadOffersFromCSVService implements UploadOffersFromCSV {
  constructor(
    @inject('ResourcesRepository')
    private readonly resourcesRepo: SaveOffersFromCSVRepository,
    @inject('UserRepository')
    private readonly userRepo: FindUserByIdIncludingResourcesRepository
  ) { }

  async execute(input: UploadOffersFromCSV.Input): Promise<UploadOffersFromCSV.Output> {
    const convertCSVFiletoJSON = container.resolve(ConvertCSVToJSONService);
    const user = await this.userRepo.findByIdIncludingResources({ id: input.user_id })

    const csvFile: ICSVFile = {
      name: input.file.originalname,
      data: input.file.buffer,
    };

    const json = await convertCSVFiletoJSON.execute({ csv: csvFile });

    await this.resourcesRepo.saveOffersFromCSV({ offers: json, resource_id: user.resources.id })

    return {
      json,
    };
  }
  //
}