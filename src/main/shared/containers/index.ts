import {
  CreateUserRepository,
  FindOfferByIdRepository, FindUserByEmailIncludingPasswordRepository,
  FindUserByEmailRepository,
  FindUserByIdIncludingResourcesRepository,
  FindUserByIdRepository, ICheckProfileRepository, ICreateProfileRepository,
  IGetProfileRepository,
  IGetShowcaseOffersRepo,
  ISignInRepo,
  ListOffersRepository,
  SaveOfferRepository,
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
  ICreateProfileRepository &
  ICheckProfileRepository
>('UserRepository', UserRepository);

container.registerSingleton<
  SaveOfferRepository &
  ListOffersRepository &
  FindOfferByIdRepository &
  SaveOffersFromCSVRepository &
  IGetShowcaseOffersRepo
>('ResourcesRepository', ResourcesRepository);

container.registerSingleton<
  IGetProfileRepository
>('AnalyticsRepository', AnalyticsRepository)

container.registerSingleton<
  ISignInRepo
>('AuthenticationRepository', AuthenticationRepository)