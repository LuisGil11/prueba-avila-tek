import { AggregateRoot } from "@core/domain/aggregate-root";
import {
  OrderId,
  OrderItem,
  OrderItemPrice,
  OrderProductQuantity,
  OrderTotal,
} from "./value-objects";
import { UserId } from "@app/auth/domain/value-objects";
import { ProductId } from "@app/products/domain/value-objects";
import { OrderCreated } from "./events/order-created.event";
import { Currencies } from "./enum/currencies";
import { OrderStatus } from "./value-objects/status";
import { DomainEvent } from "@core/domain/domain-event";
import { StatusChanged } from "./events/status-changed.event";

export class Order extends AggregateRoot<OrderId> {
  private _items?: OrderItem[];
  private _total?: OrderTotal;
  private _currency?: Currencies;
  private _user?: UserId;
  private _status?: OrderStatus;

  private constructor(id: OrderId) {
    super(id);
  }

  get items(): OrderItem[] {
    return this._items ?? [];
  }

  get total(): OrderTotal {
    return this._total!;
  }

  get currency(): Currencies {
    return this._currency!;
  }

  get user(): UserId {
    return this._user!;
  }

  get status(): OrderStatus {
    return this._status!;
  }

  static loadFromHistory(id: OrderId, events: DomainEvent[]): Order {
    const order = new Order(id);

    order.rehydrate(events);
    order.validateState();
    return order;
  }

  static create(
    id: OrderId,
    items: OrderItem[],
    user: UserId,
    currency: Currencies = Currencies.USD,
    status: OrderStatus = OrderStatus.ORDERED
  ): Order {
    const order = new Order(id);
    order.apply(
      new OrderCreated(
        id.value,
        order.version,
        items.map((item) => ({
          id: item.id.value,
          quantity: item.quantity.value,
          price: {
            amount: item.price.value.amount,
            currency: item.price.value.currency as Currencies,
          },
          total: {
            amount: item.total,
            currency,
          },
        })),
        {
          amount: items.reduce((acc, item) => acc + item.total, 0),
          currency,
        },
        user.value,
        status
      )
    );
    return order;
  }

  changeStatus(status: OrderStatus): void {
    this.apply(new StatusChanged(this.id.value, this.version, status));
  }

  [`on${OrderCreated.name}`](event: OrderCreated): void {
    this._items = event.items.map((item) =>
      OrderItem.create(
        ProductId.create(item.id),
        OrderProductQuantity.create(item.quantity),
        OrderItemPrice.create({
          amount: item.price.amount,
          currency: item.price.currency as Currencies,
        })
      )
    );

    this._currency = event.total.currency as Currencies;

    this._total = this.calculateTotal();
    this._user = UserId.create(event.userId);
    this._status = event.status as OrderStatus;
  }

  private calculateTotal(): OrderTotal {
    const total = this._items?.reduce((acc, item) => acc + item.total, 0) ?? 0;
    return OrderTotal.create({ total, currency: this._currency! });
  }

  [`on${StatusChanged.name}`](event: StatusChanged): void {
    this._status = event.status as OrderStatus;
  }

  protected validateState(): void {
    if (
      !this._items ||
      !this._total ||
      !this._user ||
      !this._currency ||
      !this._status
    ) {
      throw new Error("Order state is invalid.");
    }
  }
}
