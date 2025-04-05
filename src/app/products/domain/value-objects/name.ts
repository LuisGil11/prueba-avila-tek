import { ValueObject } from "@core/domain/value-object";
import { BaseException } from "@core/utils";

export class ProductName implements ValueObject<ProductName> {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value;
  }

  equals(obj: ProductName): boolean {
    return this._value === obj.value;
  }

  static create(value: string): ProductName {
    if (value.length > 100) {
      throw new ProductNameCreationFailedException(`Invalid name: ${value}`);
    }
    return new ProductName(value);
  }
}

export class ProductNameCreationFailedException extends BaseException {
  static code = "PRODUCT_NAME_CREATION_FAILED";

  constructor(message: string) {
    super(message, ProductNameCreationFailedException.code);
  }
}
