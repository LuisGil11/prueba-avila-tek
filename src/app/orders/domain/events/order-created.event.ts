import { DomainEvent } from "@core/domain/domain-event";
import { OrderStatus } from "../value-objects/status";

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
    public userId: string,
    public status: OrderStatus = OrderStatus.ORDERED
  ) {
    super(aggregateId, { items, userId, total, status }, aggVersion);
  }
}
