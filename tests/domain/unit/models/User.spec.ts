import User from '@/v2/domain/models/User';

describe('User', () => {
  test('should create a new User', () => {
    const sut = User.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      agreeWithPolicies: true
    });
    expect(sut.name).toBe('any_name');
    expect(sut.email).toBe('any_email');
    expect(sut.password).toBe('any_password');
    expect(sut.agreeWithPolicies).toBe(true);
  })
})

export { };
