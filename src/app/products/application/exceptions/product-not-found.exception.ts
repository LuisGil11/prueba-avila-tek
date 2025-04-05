import { BaseException } from "@core/utils";

export class ProductNotFoundException extends BaseException {
  static code = "PRODUCT_NOT_FOUND_EXCEPTION";

  constructor(message: string, cause?: BaseException) {
    super(message, ProductNotFoundException.code, cause);
  }
}
