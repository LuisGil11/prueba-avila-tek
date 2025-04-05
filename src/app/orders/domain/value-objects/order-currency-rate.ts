import { ValueObject } from "@core/domain/value-object";
import { BaseException } from "@core/utils";

export class OrderCurrencyRate implements ValueObject<OrderCurrencyRate> {
  private constructor(private readonly _value: number) {}

  get value(): number {
    return this._value;
  }

  equals(obj: OrderCurrencyRate): boolean {
    return this._value === obj._value;
  }

  static create(value: number): OrderCurrencyRate {
    if (value <= 0) {
      throw new Error("Currency rate must be greater than 0");
    }
    return new OrderCurrencyRate(value);
  }
}

export class OrderCurrencyRateException extends BaseException {
  static code = "ORDER_CURRENCY_RATE_EXCEPTION";

  constructor(message: string) {
    super(message, OrderCurrencyRateException.code);
  }
}
