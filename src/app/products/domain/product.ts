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
        name.value,
        description.value,
        price.value,
        stock.value
      )
    );
    return product;
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

    console.log(this._name);

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
        "No changes detected in the product update"
      );
    }

    this.apply(
      new ProductUpdated(
        this.id.value,
        changes.name ? changes.name.value : undefined,
        changes.description ? changes.description.value : undefined,
        changes.price ? changes.price.value : undefined,
        changes.stock ? changes.stock?.value : undefined
      )
    );
    return this;
  }

  [`on${ProductCreated.name}`](context: ProductCreated): void {
    console.log({ context });

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

  protected validateState(): void {
    console.log(this);

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

export class InvalidProductStateException extends BaseException {
  static code = "INVALID_PRODUCT_STATE";

  constructor(message: string) {
    super(message, InvalidProductStateException.code);
  }
}
export class InvalidProductUpdateException extends BaseException {
  static code = "INVALID_PRODUCT_UPDATE";

  constructor(message: string) {
    super(message, InvalidProductUpdateException.code);
  }
}
