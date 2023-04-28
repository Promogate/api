import { uploadOffersFromCSVConstroller } from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { Router } from 'express';
import multer from 'multer';

const testingRoute = Router()

const storage = multer.memoryStorage();
const upload = multer({ storage });

testingRoute.post('/parse', upload.single('file'), verifyToken, uploadOffersFromCSVConstroller.handle)

export { testingRoute };
