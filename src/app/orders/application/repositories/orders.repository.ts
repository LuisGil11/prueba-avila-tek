import { Optional } from "@core/utils";
import { Order } from "../responses/order.response";

export interface OrdersRepository {
  getAllOrders(
    limit: number,
    offset: number,
    userId?: string
  ): Promise<Optional<Order[]>>;
  getOrderById(id: string): Promise<Optional<Order>>;
}
