export class CreateOfferError extends Error {
  constructor() {
    super('Falha ao tentar criar uma nova oferta.')
    this.name = 'CreateOfferError'
  }
}