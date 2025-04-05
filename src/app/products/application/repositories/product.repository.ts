import { Product } from "@app/products/types/product";
import { Optional } from "@core/utils";

export interface ProductsRepository {
  findById(id: string): Promise<Optional<Product>>;
  getAll(limit: number, offset: number): Promise<Optional<Product[]>>;
  delete(id: string): Promise<Optional<Product>>;
}
