import { Currencies } from "@app/orders/domain/enum/currencies";

interface Item {
  id: string;
  quantity: number;
}

export interface PlaceOrderRequestBody {
  items: Item[];
  currency: Currencies;
}
