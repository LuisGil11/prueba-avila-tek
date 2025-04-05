import { BaseException } from "../../utils/base.exception";
import { Result } from "../../utils/result";
import { Service } from "../service.interface";

export abstract class Decorator<T, R> implements Service<T, R> {
  constructor(protected readonly wrappee: Service<T, R>) {}

  name: string = this.wrappee.constructor.name;

  execute(request: T): Promise<Result<R, BaseException>> {
    return this.wrappee.execute(request);
  }
}
