import { CreateRedirector } from "@/domain/features";
import { HttpServer } from "@/infra/http";

export class RedirectorController {
  constructor(
    httpServer: HttpServer,
    createRedirector: CreateRedirector
  ) {
    httpServer.on("post", "/redirector/create", [],async function (params: any, body: any) {
      await createRedirector.execute(body);
    });
  }
}