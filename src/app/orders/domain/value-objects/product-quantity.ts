import { ValueObject } from "@core/domain/value-object";
import { BaseException } from "@core/utils";

export class OrderProductQuantity implements ValueObject<OrderProductQuantity> {
  private constructor(private readonly _value: number) {}

  get value(): number {
    return this._value;
  }

  equals(obj: OrderProductQuantity): boolean {
    return this._value === obj.value;
  }

  static create(value: number): OrderProductQuantity {
    if (value <= 0) {
      throw new OrderProductQuantityCreationFailedException(
        `Invalid quantity: ${value}. Quantity cannot be negative or equal to 0.`
      );
    }
    return new OrderProductQuantity(value);
  }
}

export class OrderProductQuantityCreationFailedException extends BaseException {
  static code = "ORDER_PRODUCT_QUANTITY_CREATION_FAILED";

  constructor(message: string) {
    super(message, OrderProductQuantityCreationFailedException.code);
  }
}
