import { Currencies } from "@app/orders/domain/enum/currencies";

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  currency: Currencies;
  stock: number;
  unit: string;
}
