import { Currencies } from "@app/orders/domain/enum/currencies";
import { DomainEvent } from "@core/domain/domain-event";

export class ProductCreated extends DomainEvent {
  constructor(
    public aggregateId: string,
    public aggVersion: number,
    public name: string,
    public description: string,
    public price: { amount: number; currency: Currencies },
    public stock: { quantity: number; unit: string }
  ) {
    super(
      aggregateId,
      {
        name: name,
        description: description,
        price: price,
        stock: stock,
      },
      aggVersion
    );
  }
}
