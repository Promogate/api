export class UserAlredyExistsError extends Error {
  constructor () {
    super("Usuário já cadastrado");
    this.name = "UserAlredyExistsError";

    return {
      name: this.name,
      message: this.message
    };
  }
}