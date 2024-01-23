export class CreateOfferError extends Error {
  constructor(message: string) {
    super("Falha ao tentar criar uma nova oferta." || message);
    this.name = "CreateOfferError";
  }
}