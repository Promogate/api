import {
  CreateUserRepository,
  FindOfferByIdRepository, FindUserByEmailIncludingPasswordRepository,
  FindUserByEmailRepository,
  FindUserByIdIncludingResourcesRepository,
  FindUserByIdRepository, ICheckProfileRepository, ICreateProfileRepository,
  ISignInRepo,
  ListOffersRepository,
  SaveOfferRepository,
  SaveOffersFromCSVRepository
} from '@/data/contracts';
import {
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
  SaveOffersFromCSVRepository
>('ResourcesRepository', ResourcesRepository);

container.registerSingleton<
  ISignInRepo
>('AuthenticationRepository', AuthenticationRepository)