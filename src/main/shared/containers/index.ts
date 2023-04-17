import { CreateUserRepository, FindUserByEmailRepository, FindUserByIdRepository, SaveAccessKeysRepository, SaveRefreshTokenRepository } from '@/data/contracts';
import { RefreshTokenRepository } from '@/data/repositories';
import { AccessKeysRepository, UserRepository } from '@/infra/repositories';
import { container } from 'tsyringe';

container.registerSingleton<
  CreateUserRepository &
  FindUserByEmailRepository &
  FindUserByIdRepository
>('UserRepository', UserRepository);

container.registerSingleton<SaveAccessKeysRepository>('AccessKeysRepository', AccessKeysRepository)

container.registerSingleton<SaveRefreshTokenRepository>('RefreshTokenRepository', RefreshTokenRepository)