import { ErrorHandler, HttpStatusCode } from "@/application/utils";

export class UserNotFoundError extends ErrorHandler {
  constructor() {
      super({
          statusCode: HttpStatusCode.INTERNAL_SERVER,
          name: 'UserNotFoundError',
          message: 'Usuário não não encontrado'
      })
  }
}