import { SaveUserService } from '@/v2/application/services';
import { SaveUserError } from '@/v2/domain/errors';
import { User } from '@/v2/domain/models/User';

describe('SaveUserService', function () {
  test('it should create a user entity object', function () {
    const sut = new User('any_name', 'any_email', 'any_password', true);
    expect(sut).toEqual({ name: 'any_name', email: 'any_email', password: 'any_password', agreeWithPolicies: true })
  });

  test('it should call SaveUserRepository with correct params', async function () {
    const userRepository = {
      saveUser: jest.fn()
    };
    const sut = new SaveUserService(userRepository);
    await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      agreeWithPolicies: true
    });
    expect(userRepository.saveUser).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      agreeWithPolicies: true
    });
    expect(userRepository.saveUser).toBeCalledTimes(1);
  });

  test('it should return SaveUserError when user email is already registered', async function () {
    const userRepository = {
      saveUser: jest.fn()
    };
    userRepository.saveUser.mockResolvedValueOnce({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      agreeWithPolicies: true
    })
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