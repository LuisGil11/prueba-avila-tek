import { Currencies } from "@app/orders/domain/enum/currencies";

export interface UpdateProductRequestBody {
  name?: string;
  description?: string;
  price?: number;
  currency?: Currencies;
  unit?: string;
  stock?: number;
}

export interface UpdateProductRequestParams {
  id?: string;
}
