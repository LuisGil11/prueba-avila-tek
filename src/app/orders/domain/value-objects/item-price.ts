import { ValueObject } from "@core/domain/value-object";
import { BaseException } from "@core/utils";

const currenciesAvailable = ["USD", "EUR", "Bs"];

export class OrderItemPrice implements ValueObject<OrderItemPrice> {
  private constructor(
    private readonly _value: {
      amount: number;
      currency: string;
    }
  ) {}

  get value(): { amount: number; currency: string } {
    return this._value;
  }

  equals(obj: OrderItemPrice): boolean {
    return (
      this._value.amount === obj.value.amount &&
      this._value.currency === obj.value.currency
    );
  }

  static create(value: { amount: number; currency: string }): OrderItemPrice {
    if (value.amount < 0) {
      throw new OrderItemPriceCreationFailedException(
        `Invalid price amount: ${value.amount}. Price cannot be negative.`
      );
    }

    if (!currenciesAvailable.includes(value.currency)) {
      throw new OrderItemPriceCreationFailedException(
        `Invalid currency: ${
          value.currency
        }. The available currencies are: ${currenciesAvailable.join(", ")}`
      );
    }

    return new OrderItemPrice(value);
  }
}

export class OrderItemPriceCreationFailedException extends BaseException {
  static code = "ORDER_ITEM_PRICE_CREATION_FAILED";

  constructor(message: string) {
    super(message, OrderItemPriceCreationFailedException.code);
  }
}
