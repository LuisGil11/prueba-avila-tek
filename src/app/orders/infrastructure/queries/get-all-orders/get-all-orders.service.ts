import { Service } from "@core/application";
import { Order } from "../../../application/responses/order.response";
import { OrdersRepository } from "@app/orders/application/repositories/orders.repository";
import { Result, BaseException } from "@core/utils";
import { OrderNotFoundException } from "@app/orders/application/exceptions/order-not-found.exception";
import { UnexpectedExceptionHandler } from "@core/infrastructure/exceptions/unexpected-error.exception";
import { GetAllOrdersDto } from "../dtos/get-all-orders.dto";

export class GetAllOrdersService implements Service<GetAllOrdersDto, Order[]> {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  name: string = this.constructor.name;

  async execute(
    request: GetAllOrdersDto
  ): Promise<Result<Order[], BaseException>> {
    const { limit = 10, offset = 0, status = undefined } = request;

    try {
      const orders = await this.ordersRepository.getAllOrders(
        limit,
        offset,
        status
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

export class GetAllOrdersServiceException extends BaseException {
  static code = "GET_ALL_ORDERS_SERVICE_EXCEPTION";

  constructor(message: string) {
    super(message, GetAllOrdersServiceException.code);
  }
}
