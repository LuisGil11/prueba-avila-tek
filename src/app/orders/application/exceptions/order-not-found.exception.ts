import { BaseException } from "@core/utils";

export class OrderNotFoundException extends BaseException {
  static code = "ORDER_NOT_FOUND_EXCEPTION";

  constructor(message: string) {
    super(message, OrderNotFoundException.code);
  }
}
