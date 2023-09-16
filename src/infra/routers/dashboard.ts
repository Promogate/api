import { listOffersController, uploadOffersFromCSVConstroller } from "@/application/controllers";
import { verifyToken } from "@/application/middlewares";
import { Router } from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const dashboardRouter = Router();

dashboardRouter.use(verifyToken);
dashboardRouter.get("/offers", listOffersController.handle);
dashboardRouter.post("/offers/importer/csv", upload.single("file"), uploadOffersFromCSVConstroller.handle);

export { dashboardRouter };
