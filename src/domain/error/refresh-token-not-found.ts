export class RefreshTokenNotFoundError extends Error {
  constructor () {
    super('Refresh token is invalid')
    this.name = 'RefreshTokenNotFoundError'
    return {
      name: this.name,
      message: this.message
    }
  }
}
