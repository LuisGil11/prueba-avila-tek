import { OrderNotFoundException } from "@app/orders/application/exceptions/order-not-found.exception";
import { OrdersRepository } from "@app/orders/application/repositories/orders.repository";
import { Order } from "@app/orders/application/responses/order.response";
import { Service } from "@core/application";
import { Result, BaseException } from "@core/utils";

export class GetOrderByIdService implements Service<string, Order> {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  name: string = this.constructor.name;

  async execute(id: string): Promise<Result<Order, BaseException>> {
    try {
      const order = await this.ordersRepository.getOrderById(id);

      if (!order.hasValue) {
        return Result.makeFail(
          new OrderNotFoundException(`Order by id: ${id} not found`)
        );
      }

      return Result.makeOk(order.unwrap());
    } catch (error) {
      if (error instanceof BaseException) {
        return Result.makeFail(error as BaseException);
      }

      return Result.makeFail(
        new GetOrderByIdServiceException(
          `An unexpected error occurred while fetching the order`
        )
      );
    }
  }
}

export class GetOrderByIdServiceException extends BaseException {
  static code = "GET_ORDER_BY_ID_SERVICE_EXCEPTION";

  constructor(message: string) {
    super(message, GetOrderByIdServiceException.code);
  }
}
