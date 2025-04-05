import { Currencies } from "@app/orders/domain/enum/currencies";
import { OrderStatus } from "@app/orders/domain/value-objects/status";

interface Item {
  id: string;
  quantity: number;
}

export interface PlaceOrderRequestBody {
  items: Item[];
  currency: Currencies;
  status: OrderStatus;
}
