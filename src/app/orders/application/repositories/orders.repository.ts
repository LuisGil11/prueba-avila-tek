import { Optional } from "@core/utils";
import { Order } from "../responses/order.response";
import { OrderStatus } from "@app/orders/domain/value-objects/status";

export interface OrdersRepository {
  getAllOrders(
    limit: number,
    offset: number,
    status?: OrderStatus,
    userId?: string
  ): Promise<Optional<Order[]>>;
  getOrderById(id: string): Promise<Optional<Order>>;
}
