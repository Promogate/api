import { ICSVFile, UploadFile } from '@/domain/features';
import { container, injectable } from 'tsyringe';
import { ConvertCSVToJSONService } from './convert-csv-to-json';

@injectable()
export class UploadFileService implements UploadFile {
  async execute (input: UploadFile.Input): Promise<UploadFile.Output> {
    const convertFileUseCase = container.resolve(ConvertCSVToJSONService);

    const csvFile: ICSVFile = {
      name: input.file.originalname,
      data: input.file.buffer,
    };

    const json = await convertFileUseCase.execute({ csv: csvFile });

    return {
      csv: csvFile,
      json,
    };
  }
  //
}