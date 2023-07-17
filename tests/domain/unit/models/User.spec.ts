class User {
  name: string
  email: string
  password: string
  agreeWithPolicies: boolean

  constructor(input: Input) {
    this.name = input.name
    this.email = input.email
    this.password = input.password
    this.agreeWithPolicies = input.agreeWithPolicies
  }
}

type Input = {
  name: string,
  email: string,
  password: string,
  agreeWithPolicies: boolean
}

describe('User', () => {
  test('should create a new User', () => {
    const sut = new User({
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

export { }
