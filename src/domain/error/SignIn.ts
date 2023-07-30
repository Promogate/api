import { ErrorHandler, HttpStatusCode } from "@/application/utils";

export class SignInError extends ErrorHandler {
    constructor() {
        super({
            statusCode: HttpStatusCode.INTERNAL_SERVER,
            name: 'SignInError',
            message: 'Falha ao tentar efetuar o login'
        })
    }
}