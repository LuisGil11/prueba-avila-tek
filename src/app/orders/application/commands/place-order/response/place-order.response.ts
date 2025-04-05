import { OrderStatus } from "@app/orders/domain/value-objects/status";

export interface PlaceOrderResponse {
  orderId: string;
  status: OrderStatus;
  items: {
    id: string;
    name: string;
    quantity: number;
    priceByUnit: {
      amount: number;
      currency: string;
    };
    totalPrice: {
      amount: number;
      currency: string;
    };
  }[];
  totalPrice: {
    amount: number;
    currency: string;
  };
}
