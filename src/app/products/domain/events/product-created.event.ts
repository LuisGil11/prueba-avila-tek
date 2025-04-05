import { DomainEvent } from "@core/domain/domain-event";

export class ProductCreated extends DomainEvent {
  constructor(
    public aggregateId: string,
    public name: string,
    public description: string,
    public price: { amount: number; currency: string },
    public stock: { quantity: number; unit: string }
  ) {
    super(aggregateId, {
      name: name,
      description: description,
      price: price,
      stock: stock,
    });
  }
}
