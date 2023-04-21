export class AuthenticationFailed extends Error {
  constructor () {
    super('Email ou senha estão incorretos.')
    this.name = 'AuthenticationFailed'

    return {
      name: this.name,
      message: this.message
    }
  }
}