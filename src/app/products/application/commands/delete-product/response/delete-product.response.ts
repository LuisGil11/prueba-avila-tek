export interface DeleteProductResponse {
  id: string;
  name: string;
  description: string;
  price: {
    amount: number;
    currency: string;
  };
  stock: {
    quantity: number;
    unit: string;
  };
}
