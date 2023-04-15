
export class CreateUserFailed extends Error {
  constructor () {
    super('Failed to create user')
    this.name = 'CreateUserFailed'

    return {
      name: this.name,
      message: this.message
    }
  }
}