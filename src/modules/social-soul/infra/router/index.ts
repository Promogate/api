import { verifyToken } from "@/application/middlewares";
import {
  getCouponsController,
  getOffersByStoreIdController,
  getSingleOfferController,
  getStoresController
} from "@/modules/social-soul/controllers";
import { Router } from "express";

const socialsoulRouter = Router();

socialsoulRouter.use(verifyToken);

socialsoulRouter.get("/coupons", getCouponsController.handle);

socialsoulRouter.get("/stores", getStoresController.handle);

socialsoulRouter.get("/offers/store/:storeId", getOffersByStoreIdController.handle);

socialsoulRouter.get("/offer/:offerId", getSingleOfferController.handle);

export { socialsoulRouter };
