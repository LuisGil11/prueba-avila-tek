import { Service } from "@core/application";
import { ChangeOrderStatusDto } from "./dtos/change-order-status.dto";
import { Result, BaseException } from "@core/utils";
import { EventStore } from "@core/domain/event-store";
import { EventBus } from "@core/domain/event-bus";
import { OrdersRepository } from "../../repositories/orders.repository";
import { OrderNotFoundException } from "../../exceptions/order-not-found.exception";
import { OrderId } from "@app/orders/domain/value-objects";
import { Order } from "@app/orders/domain/order";
import { ChangeOrderStatusResponse } from "./responses/change-order-status.response";
import { UnexpectedExceptionHandler } from "@core/infrastructure/exceptions/unexpected-error.exception";

export class ChangeOrderStatusService
  implements Service<ChangeOrderStatusDto, ChangeOrderStatusResponse>
{
  constructor(
    private readonly eventStore: EventStore,
    private readonly eventBus: EventBus,
    private readonly ordersRepository: OrdersRepository
  ) {}

  name: string = this.constructor.name;

  async execute(
    request: ChangeOrderStatusDto
  ): Promise<Result<ChangeOrderStatusResponse, BaseException>> {
    const { orderId, status } = request;

    try {
      const persistedOrder = await this.ordersRepository.getOrderById(orderId);

      if (!persistedOrder.hasValue) {
        return Result.makeFail(
          new OrderNotFoundException(`Order by id: ${orderId} not found`)
        );
      }

      const orderHistory = await this.eventStore.get(orderId);

      const order = Order.loadFromHistory(
        OrderId.create(orderId),
        orderHistory
      );

      order.changeStatus(status);

      const events = order.pullEvents();
      this.eventStore.append(order.id.value, events);
      this.eventBus.publish(events[0], order.id.value);

      return Result.makeOk({
        orderId: order.id.value,
        status: order.status,
      });
    } catch (error) {
      return UnexpectedExceptionHandler.handle(error, this.name);
    }
  }
}

export class ChangeOrderStatusServiceException extends BaseException {
  static code = "CHANGE_ORDER_STATUS_SERVICE_EXCEPTION";

  constructor(message: string) {
    super(message, ChangeOrderStatusServiceException.code);
  }
}
