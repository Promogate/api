import { ErrorHandler, HttpStatusCode } from "@/application/utils";

export class UpdateProfileError extends ErrorHandler {
    constructor() {
        super({
            message: 'Serviço de atualização de perfil do usuário falhou ao tentar executar',
            name: 'UpdateProfileError',
            statusCode: HttpStatusCode.INTERNAL_SERVER
        })
    }
}