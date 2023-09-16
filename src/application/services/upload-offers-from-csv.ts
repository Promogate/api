import {
  FindUserByIdIncludingResourcesRepository,
  SaveOffersFromCSVRepository
} from "@/data/contracts";
import { ICSVFile, UploadOffersFromCSV } from "@/domain/features";
import { ConvertCSVToJSONService } from "./convert-csv-to-json";

export class UploadOffersFromCSVService implements UploadOffersFromCSV {
  constructor(
    private readonly resourcesRepository: SaveOffersFromCSVRepository,
    private readonly userRepository: FindUserByIdIncludingResourcesRepository
  ) { }

  async execute(input: UploadOffersFromCSV.Input): Promise<UploadOffersFromCSV.Output> {
    const convertCSVFiletoJSON = new ConvertCSVToJSONService();
    const user = await this.userRepository.findByIdIncludingResources({ id: input.user_id });

    const csvFile: ICSVFile = {
      data: input.file.buffer,
    };

    const json = await convertCSVFiletoJSON.execute({ csv: csvFile });

    await this.resourcesRepository.saveOffersFromCSV({ offers: json, resource_id: user.resources.id });

    return {
      json,
    };
  }
  //
}