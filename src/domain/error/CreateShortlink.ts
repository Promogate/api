export class CreateShortlinkError extends Error {
  constructor() {
    super('Falha ao criar um shortlink ao tentar criar uma oferta')
    this.name = 'CreateShortlinkError'
  }
}
