import { Currencies } from "@app/orders/domain/enum/currencies";
import { ValueObject } from "@core/domain/value-object";
import { BaseException } from "@core/utils";

export class ProductPrice implements ValueObject<ProductPrice> {
  private constructor(
    private readonly _value: {
      amount: number;
      currency: Currencies;
    }
  ) {}

  get value(): { amount: number; currency: Currencies } {
    return this._value;
  }

  equals(obj: ProductPrice): boolean {
    return (
      this._value.amount === obj.value.amount &&
      this._value.currency === obj.value.currency
    );
  }

  static create(value: { amount: number; currency: Currencies }): ProductPrice {
    if (value.amount < 0) {
      throw new ProductPriceCreationFailedException(
        `Invalid price amount: ${value.amount}. Price cannot be negative.`
      );
    }

    if (!Object.values(Currencies).includes(value.currency)) {
      throw new ProductPriceCreationFailedException(
        `Invalid currency: ${
          value.currency
        }. The available currencies are: ${Object.values(Currencies).join(
          ", "
        )}`
      );
    }

    return new ProductPrice(value);
  }
}

export class ProductPriceCreationFailedException extends BaseException {
  static code = "PRODUCT_PRICE_CREATION_FAILED";

  constructor(message: string) {
    super(message, ProductPriceCreationFailedException.code);
  }
}
