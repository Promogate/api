import {
  CreateUserRepository,
  FindAPIKeyRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository,
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
  FindUserByIdRepository
>('UserRepository', UserRepository);

container.registerSingleton<
  SaveAccessKeysRepository &
  FindAPIKeyRepository
>('AccessKeysRepository', AccessKeysRepository)

container.registerSingleton<SaveOfferRepository>('ResourcesRepository', ResourcesRepository)