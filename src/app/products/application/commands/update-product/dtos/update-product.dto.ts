import { Currencies } from "@app/orders/domain/enum/currencies";

export interface UpdateProductDto {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  currency?: Currencies;
  unit?: string;
  stock?: number;
}
