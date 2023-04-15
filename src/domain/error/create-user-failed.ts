
export class CreateUserFailed extends Error {
  constructor () {
    super('Failed to create user')
    this.name = 'CreateUserFailed'
    this.message = 'Something went wrong trying to create a new user'

    return {
      name: this.name,
      message: this.message
    }
  }
}