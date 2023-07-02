import { SaveUserService } from '@/v2/application/services';
import { SaveUserRepository } from '@/v2/data/contracts/entities';
import { SaveUserError } from '@/v2/domain/errors';
import { User } from '@/v2/domain/models/User';

class SaveUserRepositorySpy implements SaveUserRepository {
  user?: User
  result: User = {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    agreeWithPolicies: true
  }
  callsCount = 0

  async saveUser(input: SaveUserRepository.input): Promise<SaveUserRepository.output> {
    this.user = input;
    this.callsCount++
    return this.result
  }
}

describe('SaveUserService', function () {
  test('it should create a user entity object', function () {
    const sut = new User('any_name', 'any_email', 'any_password', true);
    expect(sut).toEqual({ name: 'any_name', email: 'any_email', password: 'any_password', agreeWithPolicies: true })
  });

  test('it should call SaveUserRepository with correct params', async function () {
    const userRepository = new SaveUserRepositorySpy();
    const sut = new SaveUserService(userRepository);
    await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      agreeWithPolicies: true
    });
    expect(userRepository.user).toStrictEqual({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      agreeWithPolicies: true
    });
    expect(userRepository.callsCount).toBe(1);
  });

  test('it should return SaveUserError when user email is already registered', async function () {
    const userRepository = new SaveUserRepositorySpy();
    userRepository.result = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      agreeWithPolicies: true
    }
    const sut = new SaveUserService(userRepository);
    const user = await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      agreeWithPolicies: true
    });
    expect(user).toEqual(new SaveUserError());
  });
})