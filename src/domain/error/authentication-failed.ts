export class AuthenticationFailed extends Error {
  constructor () {
    super('Authentication Failed. Email or password are incorrect. Try again')
    this.name = 'AuthenticationFailed'

    return {
      name: this.name,
      message: this.message
    }
  }
}