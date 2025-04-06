import { OrderStatus } from "@app/orders/domain/value-objects/status";

export interface ChangeOrderStatusDto {
  orderId: string;
  status: OrderStatus;
}
