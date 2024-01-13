import { Logging } from "@/domain/features/logging";
import pino, { Logger } from "pino";

export class LoggingService implements Logging {
  logger: Logger;

  constructor () {
    this.logger = pino({
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true
        }
      }
    });
  }
  info(input: string) {
    this.logger.info(input);
  }
  error(input: string) {
    this.logger.error(input);
  }
}