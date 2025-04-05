import { BaseException } from "@core/utils";
import { OrderItem } from "../value-objects/item";
import { OrderItemPrice } from "../value-objects/item-price";
import { CurrencyConverterService } from "./currency-converter.service";
import { OrderTotal } from "../value-objects/order-total";
import { Currencies } from "../enum/currencies";

export class CalculateTotalOrderPriceService {
  static async calculateTotalPrice(
    items: OrderItem[],
    converter: CurrencyConverterService,
    currency: Currencies = Currencies.USD
  ): Promise<OrderTotal> {
    const total = items.reduce((acc, item) => {
      if (item.price.value.currency === currency) {
        return acc + item.price.value.amount * item.quantity.value;
      }

      try {
        const convertedPrice = converter.execute(
          item.price.value.currency as Currencies,
          currency,
          item.price.value.amount * item.quantity.value
        );
        return acc + convertedPrice;
      } catch (error) {
        throw new CalculateTotalOrderPriceServiceException(
          `Error converting price from ${item.price.value.currency} to ${currency}.`
        );
      }
    }, 0);

    return OrderTotal.create({ total, currency });
  }
}

export class CalculateTotalOrderPriceServiceException extends BaseException {
  static code = "CALCULATE_TOTAL_ORDER_PRICE_SERVICE_FAILED";

  constructor(message: string) {
    super(message, CalculateTotalOrderPriceServiceException.code);
  }
}
