import {
  CreateUserRepository,
  FindRefreshTokenRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository,
  SaveAccessKeysRepository,
  SaveRefreshTokenRepository,
  UpdateRefreshTokenRepository
} from '@/data/contracts';
import { RefreshTokenRepository } from '@/data/repositories';
import { AccessKeysRepository, UserRepository } from '@/infra/repositories';
import { container } from 'tsyringe';

container.registerSingleton<
  CreateUserRepository &
  FindUserByEmailRepository &
  FindUserByIdRepository
>('UserRepository', UserRepository);

container.registerSingleton<SaveAccessKeysRepository>('AccessKeysRepository', AccessKeysRepository)

container.registerSingleton<
  SaveRefreshTokenRepository &
  FindRefreshTokenRepository &
  UpdateRefreshTokenRepository
>('RefreshTokenRepository', RefreshTokenRepository)