
export default class User {
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

  static create (input: Input) {
    return new User(input)
  }
}

type Input = {
  name: string,
  email: string,
  password: string,
  agreeWithPolicies: boolean
}