import { SaveUserService } from '@/v2/application/services';
import { SaveUserRepository } from '@/v2/data/contracts/entities';
import { SaveUserError } from '@/v2/domain/errors';
import { SaveUser } from '@/v2/domain/features';
import { User } from '@/v2/domain/models/User';

import { mock, MockProxy } from 'jest-mock-extended';

type SutTypes = {
  sut: SaveUser;
  userRepository: MockProxy<SaveUserRepository>
}

const makeSut = (): SutTypes => {
  const userRepository = mock<SaveUserRepository>()
  const sut = new SaveUserService(userRepository);
  return {
    sut,
    userRepository
  }
}

describe('SaveUserService', function () {
  test('it should create a user entity object', function () {
    const sut = new User('any_name', 'any_email', 'any_password', true);
    expect(sut).toEqual({ name: 'any_name', email: 'any_email', password: 'any_password', agreeWithPolicies: true })
  });

  test('it should call SaveUserRepository with correct params', async function () {
    const { sut, userRepository } = makeSut();
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
    const { userRepository, sut } = makeSut();
    userRepository.saveUser.mockResolvedValueOnce({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      agreeWithPolicies: true
    })
    const user = await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      agreeWithPolicies: true
    });
    expect(user).toEqual(new SaveUserError());
  });
})