import { Currencies } from "@app/orders/domain/enum/currencies";
import { CurrencyConverterService } from "@app/orders/domain/services";

export class InfraCurrencyConverter implements CurrencyConverterService {
  execute(from: Currencies, to: Currencies, amount: number): number {
    // Esto es para simular un convertidor de divisa. En un caso real, aquí llamaríamos a una API externa para obtener la tasa de conversión actual.
    const conversionRate = this.getConversionRate(from, to);
    return amount * conversionRate;
  }

  private getConversionRate(from: Currencies, to: Currencies): number {
    const rates: Record<Currencies, Record<Currencies, number>> = {
      [Currencies.USD]: {
        [Currencies.USD]: 1,
        [Currencies.EUR]: 0.85,
        [Currencies.Bs]: 72.19,
      },
      [Currencies.EUR]: {
        [Currencies.EUR]: 1,
        [Currencies.USD]: 1.18,
        [Currencies.Bs]: 79.31,
      },
      [Currencies.Bs]: {
        [Currencies.Bs]: 1,
        [Currencies.USD]: 0.0139,
        [Currencies.EUR]: 0.0126087504728281,
      },
    };

    return rates[from][to];
  }
}
