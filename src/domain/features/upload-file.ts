interface IUploadFile {
  filename: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

interface IFile {
  originalname: string;
  filename: string;
}

interface ICSVFile {
  name: string;
  data: Buffer;
}

interface IUploadFileDTO {
  file: IFile;
  csv: ICSVFile;
  json: unknown[];
}

export interface UploadFile {
  execute: (input: UploadFile.Input) => Promise<UploadFile.Output>;
}

export namespace UploadFile {
  export type Input = {
    file: IUploadFile
  }

  export type Output = IUploadFileDTO
}