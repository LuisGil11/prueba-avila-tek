import { Currencies } from "@app/orders/domain/enum/currencies";

interface Item {
  id: string;
  quantity: number;
}

export interface PlaceOrderDto {
  userId: string;
  items: Item[];
  currency: Currencies;
}
