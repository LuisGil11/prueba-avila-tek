import { BaseException } from "@core/utils";

export class ProductBadRequestException extends BaseException {
  static code = "PRODUCT_BAD_REQUEST";

  constructor(message: string, cause?: BaseException) {
    super(message, ProductBadRequestException.code, cause);
  }
}
