import { Service } from "@core/application";
import { PaginationDto } from "@core/infraestructure/dtos/pagination.dto";
import { Order } from "../../../application/responses/order.response";
import { OrdersRepository } from "@app/orders/application/repositories/orders.repository";
import { Result, BaseException } from "@core/utils";
import { OrderNotFoundException } from "@app/orders/application/exceptions/order-not-found.exception";
import { UnexpectedExceptionHandler } from "@core/infraestructure/exceptions/unexpected-error.exception";

export class GetAllOrdersService implements Service<PaginationDto, Order[]> {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  name: string = this.constructor.name;

  async execute(
    request: PaginationDto
  ): Promise<Result<Order[], BaseException>> {
    const { limit = 10, offset = 0 } = request;

    try {
      const orders = await this.ordersRepository.getAllOrders(limit, offset);

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
