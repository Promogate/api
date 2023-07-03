export class UserAlreadyRegisteredError extends Error {
  constructor() {
    super('Usuário já cadastrado')
  }
}