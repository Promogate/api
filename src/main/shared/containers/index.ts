import { CreateUserRepository, FindUserByEmailRepository } from '@/data/contracts';
import { UserRepository } from '@/infra/repositories';
import { container } from 'tsyringe';

container.registerSingleton<CreateUserRepository & FindUserByEmailRepository>('UserRepository', UserRepository);