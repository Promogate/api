import { ErrorHandler, HttpStatusCode } from "@/application/utils";

export class GetNumberOfOffersError extends ErrorHandler {
    constructor() {
      super({ 
        statusCode: HttpStatusCode.INTERNAL_SERVER,
        name: 'FailedToVerifyNumberOfOffers',
        message: 'Falhou ao tentar sincronizar o perfil do usuário para buscar dados'
      })
    }
  }