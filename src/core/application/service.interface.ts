import { BaseException } from "../utils/base.exception";
import { Result } from "../utils/result";

export interface Service<T, R> {
  name: string;
  execute(request: T): Promise<Result<R, BaseException>>;
}
