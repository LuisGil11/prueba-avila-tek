import { BaseException } from "../../utils/base.exception";
import { Result } from "../../utils/result";
import { ILogger } from "../ilogger.service";
import { Service } from "../service.interface";
import { Decorator } from "./decorator";

export class LoggerDecorator<T, R> extends Decorator<T, R> {
  constructor(private readonly logger: ILogger, wrappee: Service<T, R>) {
    super(wrappee);
  }

  async execute(request: T): Promise<Result<R, BaseException>> {
    this.logger.log(`ejecutando - [${this.wrappee.name}]`);

    const result = await this.wrappee.execute(request);

    if (result.isFail()) {
      this.logger.error(
        `Error en la ejecución de [${this.wrappee.name}]: ${
          result.getError().message
        }`,
        result.getError().trace
      );
      return result;
    }

    this.logger.verbose(
      `Ejecución exitosa de [${this.wrappee.name}]: ${JSON.stringify(
        result.getValue()
      )}`
    );

    return result;
  }
}
