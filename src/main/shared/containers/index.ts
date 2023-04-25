import {
  AddOfferClickRepository,
  CreateUserRepository,
  DeleteApiKeyRepository,
  FindAPIKeyRepository,
  FindOfferByIdRepository,
  FindUserByEmailRepository,
  FindUserByIdIncludingResourcesRepository,
  FindUserByIdRepository,
  ListAPIKeysRepository,
  ListOffersRepository,
  SaveAccessKeysRepository,
  SaveOfferRepository
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
  FindUserByIdIncludingResourcesRepository
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
  FindOfferByIdRepository
>('ResourcesRepository', ResourcesRepository);

container.registerSingleton<
  AddOfferClickRepository
>('AnalyticsRepository', AnalyticsRepository);