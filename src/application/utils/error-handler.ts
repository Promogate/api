export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500
}

export type ErrorHandlerParams = {
  statusCode: HttpStatusCode;
  message: string;
  name: string;
}

export class ErrorHandler extends Error {
  public statusCode: HttpStatusCode
  public name: string

  constructor ({ statusCode, message, name }: ErrorHandlerParams) {
    super()
    this.statusCode = statusCode
    this.name = name
    this.message = message
  }
}