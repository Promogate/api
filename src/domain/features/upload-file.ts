interface IUploadFile {
  filename: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

interface IUploadFileDTO {
  json: unknown[];
}

export interface UploadOffersFromCSV {
  execute: (input: UploadOffersFromCSV.Input) => Promise<UploadOffersFromCSV.Output>;
}

export namespace UploadOffersFromCSV {
  export type Input = {
    file: IUploadFile,
    user_id: string,
  }

  export type Output = IUploadFileDTO
}