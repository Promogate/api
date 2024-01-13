import { ErrorHandler, HttpStatusCode } from "@/application/utils";

export class GetUserInfoError extends ErrorHandler {
    constructor() {
        super({
            statusCode: HttpStatusCode.INTERNAL_SERVER,
            name: "GetUserInfoError",
            message: "Falha ao tentar buscar dados do usuário"
        });
    }
}