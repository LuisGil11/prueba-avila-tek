import { Service } from "@core/application";
import { GetOrdersByUserIdDto } from "./dtos/get-orders-by-user-id.dto";
import { Order } from "@app/orders/application/responses/order.response";
import { OrdersRepository } from "@app/orders/application/repositories/orders.repository";
import { Result, BaseException } from "@core/utils";
import { OrderNotFoundException } from "@app/orders/application/exceptions/order-not-found.exception";
import { UnexpectedExceptionHandler } from "@core/infraestructure/exceptions/unexpected-error.exception";

export class GetOrdersByUserIdService
  implements Service<GetOrdersByUserIdDto, Order[]>
{
  constructor(private readonly ordersRepository: OrdersRepository) {}

  name: string = this.constructor.name;

  async execute(
    request: GetOrdersByUserIdDto
  ): Promise<Result<Order[], BaseException>> {
    const { id, limit = 10, offset = 0 } = request;

    try {
      const orders = await this.ordersRepository.getAllOrders(
        limit,
        offset,
        id
      );

      if (!orders.hasValue) {
        return Result.makeFail(new OrderNotFoundException("No orders found"));
      }

      return Result.makeOk(orders.unwrap());
    } catch (error) {
      return UnexpectedExceptionHandler.handle(error, this.name);
    }
  }
}

export class GetOrdersByUserIdServiceException extends BaseException {
  static code = "GET_ORDERS_BY_USER_ID_SERVICE_EXCEPTION";

  constructor(message: string) {
    super(message, GetOrdersByUserIdServiceException.code);
  }
}
