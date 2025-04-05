export interface UpdateProductRequestBody {
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
  unit?: string;
  stock?: number;
}

export interface UpdateProductRequestParams {
  id?: string;
}
