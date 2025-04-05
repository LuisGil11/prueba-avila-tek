import { Currencies } from "@app/orders/domain/enum/currencies";

export interface UpdateProductResponse {
  id: string;
  name: string;
  description: string;
  price: {
    amount: number;
    currency: Currencies;
  };
  stock: {
    quantity: number;
    unit: string;
  };
}
