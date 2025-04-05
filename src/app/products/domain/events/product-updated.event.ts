import { DomainEvent } from "@core/domain/domain-event";

export class ProductUpdated extends DomainEvent {
  constructor(
    public aggregateId: string,
    public aggVersion: number,
    public name?: string,
    public description?: string,
    public price?: { amount: number; currency: string },
    public stock?: { quantity: number; unit: string }
  ) {
    const changes = {
      name: name ? name : undefined,
      description: description ? description : undefined,
      price: price ? price : undefined,
      stock: stock ? stock : undefined,
    };

    const filteredChanges = Object.fromEntries(
      Object.entries(changes).filter(([_, value]) => value !== undefined)
    );

    super(aggregateId, filteredChanges, aggVersion);
  }
}
