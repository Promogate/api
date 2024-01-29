export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500
}

export type ErrorHandlerParams = {
  statusCode: HttpStatusCode;
  status?: string
  message: string;
  name: string;
}

export class ErrorHandler extends Error {
  public statusCode: HttpStatusCode;
  public status: string;
  public name: string;

  constructor ({ statusCode, message, name, status }: ErrorHandlerParams) {
    super();
    this.status = status || "error";
    this.statusCode = statusCode;
    this.name = name;
    this.message = message;
  }
}