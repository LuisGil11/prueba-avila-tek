export interface PlaceOrderResponse {
  orderId: string;
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
