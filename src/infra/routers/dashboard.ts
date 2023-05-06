import { uploadOffersFromCSVConstroller } from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { Router } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const dashboardRouter = Router();

dashboardRouter.use(verifyToken);
dashboardRouter.post('/offers/', uploadOffersFromCSVConstroller.handle)
dashboardRouter.post('/offers/importer/csv', upload.single('file'), uploadOffersFromCSVConstroller.handle)

export { dashboardRouter };
