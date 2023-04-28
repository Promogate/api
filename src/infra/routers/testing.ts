import { ConvertCSVToJSONService } from '@/application/services';
import { ConvertCSVToJSON, UploadFile } from '@/domain/features';
import { Request, Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

const testingRoute = Router()

const storage = multer.memoryStorage();
const upload = multer({ storage });


interface IFile {
  originalname: string;
  filename: string;
}

interface IUploadFile {
  filename: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
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

interface IFileRepository {
  save(file: IFile): Promise<void>;
}

interface IUploadFileUseCase {
  execute(file: IUploadFile): Promise<IUploadFileDTO>;
}

class UploadFileUseCase implements UploadFile {
  constructor(
    private convertFileUseCase: ConvertCSVToJSON,
    private fileRepository: IFileRepository,
  ) { }

  async execute(input: UploadFile.Input): Promise<UploadFile.Output> {
    const csvFile: ICSVFile = {
      name: input.file.originalname,
      data: input.file.buffer,
    };

    const json = await this.convertFileUseCase.execute({ csv: csvFile });

    const savedFile: IFile = {
      originalname: input.file.originalname,
      filename: input.file.filename,
    };

    await this.fileRepository.save(savedFile);

    return {
      file: savedFile,
      csv: csvFile,
      json,
    };
  }
}

class FileRepository implements IFileRepository {
  async save(file: IFile): Promise<void> {
    // Implementação da lógica de salvar o arquivo em algum lugar
  }
}

async function handleUploadFile(request: Request) {
  const { file } = request;

  const convertFileUseCase = container.resolve(ConvertCSVToJSONService);
  const fileRepository = new FileRepository();
  const uploadFileUseCase = new UploadFileUseCase(convertFileUseCase, fileRepository);

  const uploadedFile = await uploadFileUseCase.execute({ file: file as Express.Multer.File });

  return uploadedFile;
}

testingRoute.post('/parse', upload.single('file'), async (req, res) => {
  if (req.file) {
    const { json } = await handleUploadFile(req)
    res.status(200).json(json)
  }

  return res.status(400).json({ message: 'no file was found' })
})

export { testingRoute };
