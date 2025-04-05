import { ValueObject } from "@core/domain/value-object";
import { BaseException } from "@core/utils";

const currenciesAvailable = ["USD", "EUR", "Bs"];

export class ProductPrice implements ValueObject<ProductPrice> {
  private constructor(
    private readonly _value: {
      amount: number;
      currency: string;
    }
  ) {}

  get value(): { amount: number; currency: string } {
    return this._value;
  }

  equals(obj: ProductPrice): boolean {
    return (
      this._value.amount === obj.value.amount &&
      this._value.currency === obj.value.currency
    );
  }

  static create(value: { amount: number; currency: string }): ProductPrice {
    if (value.amount < 0) {
      throw new ProductPriceCreationFailedException(
        `Invalid price amount: ${value.amount}. Price cannot be negative.`
      );
    }

    if (!currenciesAvailable.includes(value.currency)) {
      throw new ProductPriceCreationFailedException(
        `Invalid currency: ${
          value.currency
        }. The available currencies are: ${currenciesAvailable.join(", ")}`
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
