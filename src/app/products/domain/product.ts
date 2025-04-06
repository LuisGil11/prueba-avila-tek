import { AggregateRoot } from "@core/domain/aggregate-root";
import {
  ProductDescription,
  ProductId,
  ProductName,
  ProductPrice,
  ProductStock,
} from "./value-objects";
import { ProductCreated } from "./events/product-created.event";
import { BaseException } from "@core/utils";
import { DomainEvent } from "@core/domain/domain-event";
import { ProductUpdated } from "./events/product-updated.event";
import { ProductOrdered } from "./events";

export class Product extends AggregateRoot<ProductId> {
  _name?: ProductName;
  _description?: ProductDescription;
  _price?: ProductPrice;
  _stock?: ProductStock;

  private constructor(id: ProductId) {
    super(id);
  }

  static create(
    id: ProductId,
    name: ProductName,
    description: ProductDescription,
    price: ProductPrice,
    stock: ProductStock
  ) {
    const product = new Product(id);
    product.apply(
      new ProductCreated(
        id.value,
        product.version,
        name.value,
        description.value,
        price.value,
        stock.value
      )
    );
    return product;
  }

  order({
    orderedAmount,
    unit,
  }: {
    orderedAmount: number;
    unit: string;
  }): void {
    const quantity = ProductStock.create({
      unit,
      quantity: orderedAmount,
    });

    if (!this._stock) {
      throw new Error("Product stock is not defined");
    }

    if (quantity.value.unit !== this._stock.value.unit) {
      throw new UnitNotMatchException(
        "Product stock unit does not match the order quantity unit"
      );
    }

    if (this._stock?.value.quantity! - quantity.value.quantity < 0) {
      throw new InsufficientStockException(
        "Insufficient stock to fulfill the order"
      );
    }

    this.apply(new ProductOrdered(this.id.value, this.version, quantity.value));
  }

  update(
    name?: ProductName,
    description?: ProductDescription,
    price?: ProductPrice,
    stock?: ProductStock
  ): Product {
    const changes: Partial<{
      name: ProductName;
      description: ProductDescription;
      price: ProductPrice;
      stock: ProductStock;
    }> = {};

    if (name && !this._name!.equals(name)) {
      changes.name = name;
    }
    if (description && !this._description?.equals(description)) {
      changes.description = description;
    }
    if (price && !this._price?.equals(price)) {
      changes.price = price;
    }
    if (stock && !this._stock?.equals(stock)) {
      changes.stock = stock;
    }

    if (Object.keys(changes).length === 0) {
      throw new InvalidProductUpdateException(
        "No changes detected in the updated product"
      );
    }

    this.apply(
      new ProductUpdated(
        this.id.value,
        this.version,
        changes.name ? changes.name.value : undefined,
        changes.description ? changes.description.value : undefined,
        changes.price ? changes.price.value : undefined,
        changes.stock ? changes.stock?.value : undefined
      )
    );
    return this;
  }

  [`on${ProductCreated.name}`](context: ProductCreated): void {
    this._name = ProductName.create(context.name);
    this._description = ProductDescription.create(context.description);
    this._price = ProductPrice.create(context.price);
    this._stock = ProductStock.create(context.stock);
  }

  [`on${ProductUpdated.name}`](context: ProductUpdated): void {
    if (context.name) this._name = ProductName.create(context.name);
    if (context.description)
      this._description = ProductDescription.create(context.description);
    if (context.price) this._price = ProductPrice.create(context.price);
    if (context.stock) this._stock = ProductStock.create(context.stock);
  }

  [`on${ProductOrdered.name}`](event: ProductOrdered): void {
    if (this._stock) {
      this._stock = ProductStock.create({
        unit: this._stock.value.unit,
        quantity: this._stock.value.quantity - event.quantity.quantity,
      });
    }
  }

  protected validateState(): void {
    if (!this._name || !this._description || !this._price || !this._stock) {
      throw new Error("Product state is invalid");
    }
  }

  static loadFromHistory(id: ProductId, events: DomainEvent[]): Product {
    const product = new Product(id);

    product.rehydrate(events);
    product.validateState();
    return product;
  }
}

export class InvalidProductUpdateException extends BaseException {
  static code = "INVALID_PRODUCT_UPDATE";

  constructor(message: string) {
    super(message, InvalidProductUpdateException.code);
  }
}

export class InsufficientStockException extends BaseException {
  static code = "INSUFFICIENT_STOCK";

  constructor(message: string) {
    super(message, InsufficientStockException.code);
  }
}

export class UnitNotMatchException extends BaseException {
  static code = "UNIT_NOT_MATCH";

  constructor(message: string) {
    super(message, UnitNotMatchException.code);
  }
}
