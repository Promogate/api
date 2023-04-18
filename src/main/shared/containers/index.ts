import {
  CreateUserRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository,
  SaveAccessKeysRepository
} from '@/data/contracts';
import { AccessKeysRepository, UserRepository } from '@/data/repositories';
import { container } from 'tsyringe';

container.registerSingleton<
  CreateUserRepository &
  FindUserByEmailRepository &
  FindUserByIdRepository
>('UserRepository', UserRepository);

container.registerSingleton<SaveAccessKeysRepository>('AccessKeysRepository', AccessKeysRepository)