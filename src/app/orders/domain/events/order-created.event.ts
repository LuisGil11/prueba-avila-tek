import { DomainEvent } from "@core/domain/domain-event";

export class OrderCreated extends DomainEvent {
  constructor(
    public aggregateId: string,
    public aggVersion: number,
    public items: {
      id: string;
      quantity: number;
      price: {
        amount: number;
        currency: string;
      };
    }[],
    public total: {
      amount: number;
      currency: string;
    },
    public userId: string
  ) {
    super(aggregateId, { items, userId, total }, aggVersion);
  }
}
