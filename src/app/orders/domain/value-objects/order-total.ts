import { Currencies } from "@app/orders/domain/enum/currencies";
import { ValueObject } from "@core/domain/value-object";
import { BaseException } from "@core/utils";

export class OrderTotal implements ValueObject<OrderTotal> {
  private constructor(
    private readonly _value: {
      total: number;
      currency: Currencies;
    }
  ) {}

  get value(): { total: number; currency: Currencies } {
    return this._value;
  }

  equals(obj: OrderTotal): boolean {
    return (
      this._value.total === obj.value.total &&
      this._value.currency === obj.value.currency
    );
  }

  static create(value: { total: number; currency: Currencies }): OrderTotal {
    if (value.total < 0) {
      throw new OrderTotalCreationFailedException(
        `Invalid total price: ${value.total}. Price cannot be negative.`
      );
    }

    if (!Object.values(Currencies).includes(value.currency)) {
      throw new OrderTotalCreationFailedException(
        `Invalid currency: ${
          value.currency
        }. The available currencies are: ${Object.values(Currencies).join(
          ", "
        )}`
      );
    }

    return new OrderTotal(value);
  }
}

export class OrderTotalCreationFailedException extends BaseException {
  static code = "ORDER_TOTAL_CREATION_FAILED";

  constructor(message: string) {
    super(message, OrderTotalCreationFailedException.code);
  }
}
