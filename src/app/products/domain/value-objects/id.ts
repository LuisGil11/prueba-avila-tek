import { ValueObject } from "@core/domain/value-object";
import { BaseException } from "@core/utils";
import { UUIDRegex } from "@core/utils/uuid.regex";

export class ProductId implements ValueObject<ProductId> {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value;
  }

  equals(obj: ProductId): boolean {
    return this._value === obj.value;
  }

  static create(value: string): ProductId {
    if (!value.match(UUIDRegex)) {
      throw new ProductIdCreationFailedException(`Invalid id: ${value}`);
    }
    return new ProductId(value);
  }
}

export class ProductIdCreationFailedException extends BaseException {
  static code = "Product_ID_CREATION_FAILED";

  constructor(message: string) {
    super(message, ProductIdCreationFailedException.code);
  }
}
