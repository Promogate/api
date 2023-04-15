export class UserNotFound extends Error {
  constructor () {
    super('User was not found')
    this.name = 'UserNotFound'
    return {
      name: this.name,
      message: this.message
    }
  }
}