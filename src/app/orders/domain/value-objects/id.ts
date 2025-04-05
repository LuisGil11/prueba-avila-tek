import { ValueObject } from "@core/domain/value-object";
import { BaseException } from "@core/utils";
import { UUIDRegex } from "@core/utils/uuid.regex";

export class OrderId implements ValueObject<OrderId> {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value;
  }

  equals(obj: OrderId): boolean {
    return this._value === obj.value;
  }

  static create(value: string): OrderId {
    if (!value.match(UUIDRegex)) {
      throw new OrderIdCreationFailedException(`Invalid id: ${value}`);
    }
    return new OrderId(value);
  }
}

export class OrderIdCreationFailedException extends BaseException {
  static code = "ORDER_ID_CREATION_FAILED";

  constructor(message: string) {
    super(message, OrderIdCreationFailedException.code);
  }
}
