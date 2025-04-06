import { OrderStatus } from "@app/orders/domain/value-objects/status";

export interface ChangeOrderStatusResponse {
  orderId: string;
  status: OrderStatus;
}
