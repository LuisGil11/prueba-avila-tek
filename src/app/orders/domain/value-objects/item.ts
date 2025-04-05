import { ProductId } from "@app/products/domain/value-objects";
import { Entity } from "@core/domain/entity";
import { OrderProductQuantity } from "./product-quantity";
import { OrderItemPrice } from "./item-price";

export class OrderItem extends Entity<ProductId> {
  constructor(
    id: ProductId,
    private _quantity: OrderProductQuantity,
    private _price: OrderItemPrice
  ) {
    super(id);
  }

  get quantity(): OrderProductQuantity {
    return this._quantity;
  }

  static create(
    id: ProductId,
    quantity: OrderProductQuantity,
    price: OrderItemPrice
  ): OrderItem {
    return new OrderItem(id, quantity, price);
  }

  get price(): OrderItemPrice {
    return this._price;
  }

  get total(): number {
    return this._price.value.amount * this._quantity.value;
  }

  add(quantity: OrderProductQuantity): void {
    this._quantity = OrderProductQuantity.create(
      this._quantity.value + quantity.value
    );
  }

  sub(quantity: OrderProductQuantity): void {
    this._quantity = OrderProductQuantity.create(
      this._quantity.value - quantity.value
    );
  }
}
