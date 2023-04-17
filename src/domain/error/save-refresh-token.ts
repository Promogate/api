export class SaveRefreshTokenError extends Error {
  constructor() {
    super('Something went wrong. It could not save refresh token');
    this.name = 'SaveRefreshTokenError'
    return {
      name: this.name,
      message: this.message
    }
  }
}