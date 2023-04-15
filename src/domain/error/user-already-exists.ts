export class UserAlredyExistsError extends Error {
  constructor () {
    super('User already exists')
    this.name = 'UserAlredyExistsError'
    this.message = 'User already registered.'

    return {
      name: this.name,
      message: this.message
    }
  }
}