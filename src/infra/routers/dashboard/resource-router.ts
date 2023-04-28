import {
  createOfferController,
  findOfferByIdController,
  listOffersController,
  uploadOffersFromCSVConstroller
} from '@/application/controllers';
import { verifyToken } from '@/application/middlewares';
import { Router } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const dashboardResourceRouter = Router();

dashboardResourceRouter.use(verifyToken);
dashboardResourceRouter.post('/offer/create', createOfferController.handle);
dashboardResourceRouter.post('/offers/importer/csv', upload.single('file'), uploadOffersFromCSVConstroller.handle);
dashboardResourceRouter.get('/offers', listOffersController.handle);
dashboardResourceRouter.get('/offers/:id', findOfferByIdController.handle);

export { dashboardResourceRouter };
