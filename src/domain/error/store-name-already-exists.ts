export class StoreNameAlreadyExists extends Error {
  constructor() {
    super("Nome da loja já existe");
    this.name = "StoreNameAlreadyExists";
    return {
      message: this.message,
      name: this.name
    };
  }
}