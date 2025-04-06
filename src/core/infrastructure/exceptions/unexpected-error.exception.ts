import { BaseException, Result } from "@core/utils";
import { PinoLogger } from "../utils/pino-logger";

const logger = PinoLogger.getInstance();

export class UnexpectedException extends BaseException {
  static code = "UNEXPECTED_EXCEPTION";
  static message = "An unexpected error occurred. Check logs for details.";

  constructor() {
    super(UnexpectedException.message, UnexpectedException.code);
  }
}

export class UnexpectedExceptionHandler {
  static handle<T = unknown>(
    error: unknown,
    occuredAt: string
  ): Result<T, BaseException> {
    logger.error(
      `Unhandled error was triggered in ${occuredAt}`,
      JSON.stringify(error)
    );

    if (error instanceof BaseException) {
      return Result.makeFail(error as BaseException);
    }

    return Result.makeFail(new UnexpectedException());
  }
}
