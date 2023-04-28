import { convertCSVToJSONController } from '@/application/controllers';
import { Router } from 'express';
import multer from 'multer';

const testingRoute = Router()

const storage = multer.memoryStorage();
const upload = multer({ storage });

testingRoute.post('/parse', upload.single('file'), convertCSVToJSONController.handle)

export { testingRoute };
