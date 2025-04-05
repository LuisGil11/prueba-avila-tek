import { ValueObject } from "@core/domain/value-object";
import { BaseException } from "@core/utils";

export class ProductDescription implements ValueObject<ProductDescription> {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value;
  }

  equals(obj: ProductDescription): boolean {
    return this._value === obj.value;
  }

  static create(value: string): ProductDescription {
    if (value.length > 1000) {
      throw new ProductDescriptionCreationFailedException(
        `Invalid description: ${value}`
      );
    }
    return new ProductDescription(value);
  }
}

export class ProductDescriptionCreationFailedException extends BaseException {
  static code = "PRODUCT_DESCRIPTION_CREATION_FAILED";

  constructor(message: string) {
    super(message, ProductDescriptionCreationFailedException.code);
  }
}
