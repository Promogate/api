export class OfferLimitError extends Error {
  constructor() {
    super('Limite de ofertas cadastradas atingido')
    this.name = 'OfferLimitError'
  }
}