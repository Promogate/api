export class UserAlredyExistsError extends Error {
  constructor () {
    super('User already exists')
    this.name = 'UserAlredyExistsError'

    return {
      name: this.name,
      message: this.message
    }
  }
}