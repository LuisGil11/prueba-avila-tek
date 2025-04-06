import { PrismaClient } from "@prisma/client";
import { BaseException } from "../../utils/base.exception";
import { Result } from "../../utils/result";
import { Service } from "../service.interface";
import { Decorator } from "./decorator";
import { ILogger } from "../ilogger.service";

export class PerformanceDecorator<T, R> extends Decorator<T, R> {
  private prisma: PrismaClient;

  constructor(wrappee: Service<T, R>, private readonly logger: ILogger) {
    super(wrappee);

    this.prisma = new PrismaClient();
  }

  async execute(request: T): Promise<Result<R, BaseException>> {
    const start = new Date();
    const result = await this.wrappee.execute(request);
    const end = new Date();

    const time = end.getTime() - start.getTime();

    try {
      await this.prisma.executionPerformance.create({
        data: {
          serviceName: this.wrappee.constructor.name,
          duration: time,
          startedAt: start,
          finishedAt: end,
          result: result.isOk() ? "SUCCESS" : "FAILURE",
        },
      });

      this.logger.verbose(
        `Performance data saved for ${this.wrappee.constructor.name}: ${time}ms`
      );

      return result;
    } catch (error) {
      this.logger.warn(
        `Error saving performance data for ${this.wrappee.constructor.name}: ${error}`
      );
      return result;
    }
  }
}
