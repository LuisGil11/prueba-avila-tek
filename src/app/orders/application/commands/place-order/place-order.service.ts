import { Service } from "@core/application";
import { PlaceOrderDto } from "./dtos/place-order.dto";
import { PlaceOrderResponse } from "./response/place-order.response";
import { Result, BaseException } from "@core/utils";
import { EventBus } from "@core/domain/event-bus";
import { EventStore } from "@core/domain/event-store";
import { ProductsRepository } from "@app/products/application/repositories/product.repository";
import { CurrencyConverterService } from "@app/orders/domain/services";
import { ProductNotFoundException } from "@app/products/application/exceptions";
import { IdGenerator } from "@core/utils/id/id.generator";
import {
  OrderId,
  OrderItem,
  OrderItemPrice,
  OrderProductQuantity,
} from "@app/orders/domain/value-objects";
import { ProductId } from "@app/products/domain/value-objects";
import { UserId } from "@app/auth/domain/value-objects";
import { Order } from "@app/orders/domain/order";
import { Currencies } from "@app/orders/domain/enum/currencies";

export class PlaceOrderService
  implements Service<PlaceOrderDto, PlaceOrderResponse>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly eventStore: EventStore,
    private readonly producstRepository: ProductsRepository,
    private readonly currencyConverterService: CurrencyConverterService,
    private readonly idGenerator: IdGenerator
  ) {}
  name: string = this.constructor.name;
  async execute(
    request: PlaceOrderDto
  ): Promise<Result<PlaceOrderResponse, BaseException>> {
    const { userId, items, currency = Currencies.USD } = request;

    try {
      const existingProductsResponse = await this.producstRepository.findByIds(
        items.map((item) => item.id)
      );

      if (!existingProductsResponse.hasValue) {
        return Result.makeFail(
          new ProductNotFoundException("No products found")
        );
      }

      const existingProducts = existingProductsResponse.unwrap();

      if (existingProducts.length !== items.length) {
        return Result.makeFail(
          new ProductNotFoundException(
            `Some products were not found: ${items
              .map((item) => item.id)
              .filter(
                (id) => !existingProducts.some((product) => product.id === id)
              )}`
          )
        );
      }

      const id = this.idGenerator.generate();

      const orderId = OrderId.create(id);

      const orderItems = items.map((item) =>
        OrderItem.create(
          ProductId.create(item.id),
          OrderProductQuantity.create(item.quantity),
          OrderItemPrice.create(
            existingProducts.find((product) => product.id === item.id)!.price
          )
        )
      );

      const user = UserId.create(userId);

      const order = await Order.create(
        orderId,
        orderItems,
        user,
        this.currencyConverterService,
        currency
      );

      const events = order.pullEvents();

      this.eventStore.append(orderId.value, events);

      this.eventBus.publish(events[0], orderId.value);

      return Result.makeOk({
        orderId: orderId.value,
        items: orderItems.map((item) => ({
          id: item.id.value,
          name: existingProducts.find(
            (product) => product.id === item.id.value
          )!.name,
          quantity: item.quantity.value,
          priceByUnit: {
            amount: item.price.value.amount,
            currency: item.price.value.currency,
          },
          totalPrice: {
            amount: item.price.value.amount * item.quantity.value,
            currency: item.price.value.currency,
          },
        })),
        totalPrice: {
          amount: Number(order.total.value.total.toFixed(2)),
          currency,
        },
      });
    } catch (error) {
      if (error instanceof BaseException) {
        return Result.makeFail(error);
      }
      return Result.makeFail(
        new PlaceOrderServiceException(
          `An unexpected error occurred while placing the order`
        )
      );
    }
  }
}

export class PlaceOrderServiceException extends BaseException {
  static code = "PLACE_ORDER_SERVICE_EXCEPTION";

  constructor(message: string) {
    super(message, PlaceOrderServiceException.code);
  }
}
