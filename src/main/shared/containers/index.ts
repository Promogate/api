import { CreateUserRepository, FindUserByEmailRepository, FindUserByIdRepository } from '@/data/contracts';
import { UserRepository } from '@/infra/repositories';
import { container } from 'tsyringe';

container.registerSingleton<
  CreateUserRepository &
  FindUserByEmailRepository &
  FindUserByIdRepository
>('UserRepository', UserRepository);