export class AuthenticationFailed extends Error {
  constructor () {
    super("Usuário ou email estão incorretos. Tente novamente.");
    this.name = "AuthenticationFailed";

    return {
      name: this.name,
      message: this.message
    };
  }
}