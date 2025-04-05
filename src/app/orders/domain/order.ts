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
import {
  CurrencyConverterService,
  CalculateTotalOrderPriceService,
} from "./services";
import { Currencies } from "./enum/currencies";

export class Order extends AggregateRoot<OrderId> {
  private _items?: OrderItem[];
  private _total?: OrderTotal;
  private _currency?: Currencies;
  private _user?: UserId;

  private constructor(
    id: OrderId,
    private readonly currencyConverter: CurrencyConverterService
  ) {
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

  static async create(
    id: OrderId,
    items: OrderItem[],
    user: UserId,
    currencyConverter: CurrencyConverterService,
    currency: Currencies = Currencies.USD
  ): Promise<Order> {
    const order = new Order(id, currencyConverter);
    await order.apply(
      new OrderCreated(
        id.value,
        order.version,
        items.map((item) => ({
          id: item.id.value,
          quantity: item.quantity.value,
          price: item.price.value,
        })),
        {
          amount: items.reduce((acc, item) => acc + item.total, 0),
          currency,
        },
        user.value
      )
    );
    return order;
  }

  async [`on${OrderCreated.name}`](event: OrderCreated): Promise<void> {
    this._items = event.items.map((item) =>
      OrderItem.create(
        ProductId.create(item.id),
        OrderProductQuantity.create(item.quantity),
        OrderItemPrice.create({
          amount: item.price.amount,
          currency: item.price.currency,
        })
      )
    );

    this._currency = event.total.currency as Currencies;

    this._total = await CalculateTotalOrderPriceService.calculateTotalPrice(
      this._items,
      this.currencyConverter,
      this._currency
    );
    this._user = UserId.create(event.userId);
  }

  protected validateState(): void {
    if (!this._items || !this._total || !this._user || !this._currency) {
      throw new Error("Order state is invalid.");
    }
  }
}
