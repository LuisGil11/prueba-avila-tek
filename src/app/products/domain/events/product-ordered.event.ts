import { DomainEvent } from "@core/domain/domain-event";

export class ProductOrdered extends DomainEvent {
  constructor(
    public aggregateId: string,
    public aggVersion: number,
    public quantity: {
      unit: string;
      quantity: number;
    }
  ) {
    super(aggregateId, { quantity }, aggVersion);
  }
}
