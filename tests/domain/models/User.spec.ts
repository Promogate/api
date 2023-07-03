import { SaveUserService } from '@/v2/application/services';
import { SaveUserRepository } from '@/v2/data/contracts/entities';
import { SaveUserError } from '@/v2/domain/errors';
import { User } from '@/v2/domain/models/User';

import { mock, MockProxy } from 'jest-mock-extended';

describe('SaveUserService', function () {
  let userRepository: MockProxy<SaveUserRepository>;
  let sut: SaveUserService;
  const user= {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    agreeWithPolicies: true
  }

  beforeEach(function () {
    userRepository = mock();
    sut = new SaveUserService(userRepository);
  })

  test('it should create a user entity object', function () {
    const sut = new User('any_name', 'any_email', 'any_password', true);
    expect(sut).toEqual({ name: 'any_name', email: 'any_email', password: 'any_password', agreeWithPolicies: true })
  });

  test('it should call SaveUserRepository with correct params', async function () {
    await sut.execute(user);
    expect(userRepository.saveUser).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      agreeWithPolicies: true
    });
    expect(userRepository.saveUser).toBeCalledTimes(1);
  });

  test('it should return SaveUserError when user email is already registered', async function () {
    userRepository.saveUser.mockResolvedValueOnce({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      agreeWithPolicies: true
    })
    const result = await sut.execute(user);
    expect(result).toEqual(new SaveUserError());
  });
})