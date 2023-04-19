import {
  CreateUserRepository,
  FindAPIKeyRepository,
  FindUserByEmailRepository,
  FindUserByIdIncludingResourcesRepository,
  FindUserByIdRepository,
  ListOffersRepository,
  SaveAccessKeysRepository,
  SaveOfferRepository
} from '@/data/contracts';
import {
  AccessKeysRepository,
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
  FindAPIKeyRepository
>('AccessKeysRepository', AccessKeysRepository)

container.registerSingleton<
  SaveOfferRepository &
  ListOffersRepository
>('ResourcesRepository', ResourcesRepository)