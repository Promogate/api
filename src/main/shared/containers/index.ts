import {
  AddOfferClickRepository,
  CreateUserRepository,
  DeleteApiKeyRepository,
  FindAPIKeyRepository,
  FindOfferByIdRepository,
  FindUserByEmailIncludingPasswordRepository,
  FindUserByEmailRepository,
  FindUserByIdIncludingResourcesRepository,
  FindUserByIdRepository,
  GetOffersClicksRepository, GetOffersWithClicksCountRepo,
  ListAPIKeysRepository,
  ListOffersRepository,
  SaveAccessKeysRepository,
  SaveOfferRepository,
  SaveOffersFromCSVRepository
} from '@/data/contracts';
import {
  AccessKeysRepository,
  AnalyticsRepository,
  ResourcesRepository,
  UserRepository
} from '@/data/repositories';
import { container } from 'tsyringe';

container.registerSingleton<
  CreateUserRepository &
  FindUserByEmailRepository &
  FindUserByIdRepository &
  FindUserByIdIncludingResourcesRepository &
  FindUserByEmailIncludingPasswordRepository
>('UserRepository', UserRepository);

container.registerSingleton<
  SaveAccessKeysRepository &
  FindAPIKeyRepository &
  ListAPIKeysRepository &
  DeleteApiKeyRepository
>('AccessKeysRepository', AccessKeysRepository);

container.registerSingleton<
  SaveOfferRepository &
  ListOffersRepository &
  FindOfferByIdRepository &
  SaveOffersFromCSVRepository
>('ResourcesRepository', ResourcesRepository);

container.registerSingleton<
  AddOfferClickRepository &
  GetOffersClicksRepository &
  GetOffersWithClicksCountRepo
>('AnalyticsRepository', AnalyticsRepository);