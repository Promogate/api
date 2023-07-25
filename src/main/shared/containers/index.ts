import {
  CreateUserRepository,
  FindOfferByIdRepository,
  FindUserByEmailIncludingPasswordRepository,
  FindUserByEmailRepository,
  FindUserByIdIncludingResourcesRepository,
  FindUserByIdRepository,
  ICheckProfileRepository, IGetProfileRepository,
  IGetShowcaseOffersRepo,
  IGetStoreDataRepo,
  ISignInRepo,
  ISignUpRepo,
  ListOffersRepository,
  SaveOffersFromCSVRepository
} from '@/data/contracts';
import {
  AnalyticsRepository,
  AuthenticationRepository,
  ResourcesRepository,
  UserRepository
} from '@/data/repositories';
import { container } from 'tsyringe';

container.registerSingleton<
  CreateUserRepository &
  FindUserByEmailRepository &
  FindUserByIdRepository &
  FindUserByIdIncludingResourcesRepository &
  FindUserByEmailIncludingPasswordRepository &
  ICheckProfileRepository
>('UserRepository', UserRepository);

container.registerSingleton<
  ListOffersRepository &
  FindOfferByIdRepository &
  SaveOffersFromCSVRepository &
  IGetShowcaseOffersRepo &
  IGetStoreDataRepo
>('ResourcesRepository', ResourcesRepository);

container.registerSingleton<
  IGetProfileRepository
>('AnalyticsRepository', AnalyticsRepository)

container.registerSingleton<
  ISignInRepo &
  ISignUpRepo
>('AuthenticationRepository', AuthenticationRepository)