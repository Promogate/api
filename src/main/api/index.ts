import * as dotenv from "dotenv";
dotenv.config();

import "../config/module-alias";

import {
  AnalyticsController,
  AuthenticationController,
  RedirectorController,
  ResourcesController
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
  createApiKeyController
);
new RedirectorController(httpServer, createRedirectorShorlinkService, redirectorLinkService);
new AnalyticsController(httpServer, getProfileService);

httpServer.listen(Number(PORT));