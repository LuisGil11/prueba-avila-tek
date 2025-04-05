import { Currencies } from "../enum/currencies";

export interface CurrencyConverterService {
  execute(from: Currencies, to: Currencies, amount: number): number;
}
