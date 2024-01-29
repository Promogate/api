import * as dotenv from "dotenv";
dotenv.config();

import "../config/module-alias";

import {
  AnalyticsController,
  AuthenticationController,
  RedirectorController,
  ResourcesController,
  StripeController
} from "@/application/controllers";
import { SocialSoulController } from "@/application/controllers/socialsoul-controller";
import {
  CreateApiKeyService,
  CreateRedirectorService,
  CreateRedirectorShortlinkService,
  CreateShortlinkService,
  CreateUserService,
  GetOffersFromStoreService,
  GetProfileService,
  GetStoreDataService,
  LoggingService,
  SignInService,
  UpdateFeaturedOfferStatusService,
  UpdateOfferService,
  UpdateShowcaseOfferStatusService
} from "@/application/services";
import {
  CreateOfferUseCase,
  CreateProfileUseCase
} from "@/application/usecases";
import {
  AnalyticsRepository,
  AuthenticationRepository,
  RedirectorRepository,
  ResourcesRepository,
  UserRepository
} from "@/data/repositories";
import { ExpressAdapter } from "@/infra/http";
import { RedirectorLinkService } from "@/application/services/redirector-link";
import { DateHandlerService } from "@/application/services/date-handler";

const PORT = process.env.PORT || 8080;

const loggingService = new LoggingService();
const authenticationRepository = new AuthenticationRepository();
const signInService = new SignInService(authenticationRepository);
const getOfferFromStoreService = new GetOffersFromStoreService();
const resourcesRepository = new ResourcesRepository();
const getStoreDataService = new GetStoreDataService(resourcesRepository);
const createShortlinkService = new CreateShortlinkService();
const createOfferService = new CreateOfferUseCase(resourcesRepository, createShortlinkService);
const updateOfferService = new UpdateOfferService();
const updateOfferShowcaseStatus = new UpdateShowcaseOfferStatusService();
const updateOfferFeaturedStatus = new UpdateFeaturedOfferStatusService();
const analyticsRepository = new AnalyticsRepository();
const getProfileService = new GetProfileService(analyticsRepository);
const createUserService = new CreateUserService(loggingService, authenticationRepository);
const userRepository = new UserRepository();
const createProfileService = new CreateProfileUseCase(userRepository);
const createApiKeyController = new CreateApiKeyService(authenticationRepository);
const createRedirectorShorlinkService = new CreateRedirectorShortlinkService();
const redirectorLinkService = new RedirectorLinkService();
const dateHandlerService = new DateHandlerService();

const httpServer = new ExpressAdapter();

new SocialSoulController(httpServer);
new ResourcesController(
  httpServer,
  getOfferFromStoreService,
  getStoreDataService,
  createOfferService,
  updateOfferService,
  updateOfferShowcaseStatus,
  updateOfferFeaturedStatus
);
new AuthenticationController(
  httpServer,
  signInService,
  createUserService,
  createProfileService,
  createApiKeyController,
  dateHandlerService
);
new RedirectorController(httpServer, createRedirectorShorlinkService, redirectorLinkService);
new AnalyticsController(httpServer, getProfileService);
new StripeController(httpServer);

httpServer.listen(Number(PORT));