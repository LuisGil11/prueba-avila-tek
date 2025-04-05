import { ValueObject } from "@core/domain/value-object";
import { BaseException } from "@core/utils";

const availableUnits = ["units", "dozen", "kg", "g", "liters", "ml"];

export class ProductStock implements ValueObject<ProductStock> {
  private constructor(
    private readonly _value: {
      quantity: number;
      unit: string;
    }
  ) {}

  get value(): {
    quantity: number;
    unit: string;
  } {
    return this._value;
  }

  equals(obj: ProductStock): boolean {
    return (
      this._value.quantity === obj.value.quantity &&
      this._value.unit === obj.value.unit
    );
  }

  static create(value: { quantity: number; unit: string }): ProductStock {
    if (value.quantity < 0) {
      throw new ProductStockCreationFailedException(
        `Invalid  quantity: ${value.quantity}. Stock quantity cannot be negative`
      );
    }

    if (!Number.isInteger(value.quantity)) {
      throw new ProductStockCreationFailedException(
        `Invalid stock quantity: ${value.quantity}. Stock quantity must be an integer`
      );
    }

    if (!availableUnits.includes(value.unit)) {
      throw new ProductStockCreationFailedException(
        `Invalid stock unit: ${
          value.unit
        }. Unit is not valid. Available units are: ${availableUnits.join(", ")}`
      );
    }
    return new ProductStock(value);
  }
}

export class ProductStockCreationFailedException extends BaseException {
  static code = "PRODUCT_STOCK_CREATION_FAILED";

  constructor(message: string) {
    super(message, ProductStockCreationFailedException.code);
  }
}
