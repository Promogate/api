export class CreateUserError extends Error {
  constructor() {
    super("Falhou ao tentar criar um usuário");
  }
}