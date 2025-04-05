export interface UpdateProductDto {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
  unit?: string;
  stock?: number;
}
