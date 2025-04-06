import pino, { Logger } from "pino";
import { ILogger } from "../../application/ilogger.service";

export class PinoLogger implements ILogger {
  private static instance: PinoLogger;
  private readonly logger: Logger;

  private constructor() {
    this.logger = pino({
      level: "debug",
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:dd-mm-yyyy HH:MM",
          ignore: "pid,hostname",
        },
      },
    });
  }

  error(message: string, trace: string): void {
    this.logger.error({ trace }, `${message}`);
  }
  log(message: string): void {
    this.logger.info(`${message}`);
  }
  verbose(message: string): void {
    this.logger.debug(`${message}`);
  }
  warn(message: string): void {
    this.logger.warn(`${message}`);
  }

  static getInstance(): PinoLogger {
    if (!PinoLogger.instance) {
      PinoLogger.instance = new PinoLogger();
    }
    return PinoLogger.instance;
  }
}
