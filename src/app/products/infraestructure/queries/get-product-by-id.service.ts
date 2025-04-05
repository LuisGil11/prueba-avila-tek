import { ProductsRepository } from "@app/products/application/repositories/product.repository";
import { Product } from "@app/products/types/product";
import { Service } from "@core/application";
import { Result, BaseException } from "@core/utils";

export class GetProductByIdService implements Service<string, Product> {
  name: string = this.constructor.name;

  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(id: string): Promise<Result<Product, BaseException>> {
    try {
      const product = await this.productsRepository.findById(id);

      if (!product.hasValue) {
        return Result.makeFail(
          new ProductNotFoundException("Product not found")
        );
      }

      return Result.makeOk(product.unwrap());
    } catch (error) {
      return Result.makeFail(
        new GetProductByIdServiceException(
          "An unexpected Error happened while retrieving the product",
          error as BaseException
        )
      );
    }
  }
}

export class ProductNotFoundException extends BaseException {
  static code = "PRODUCT_NOT_FOUND_EXCEPTION";

  constructor(message: string, cause?: BaseException) {
    super(message, ProductNotFoundException.code, cause);
  }
}

export class GetProductByIdServiceException extends BaseException {
  static code = "GET_PRODUCT_BY_ID_SERVICE_EXCEPTION";

  constructor(message: string, cause?: BaseException) {
    super(message, GetProductByIdServiceException.code, cause);
  }
}
