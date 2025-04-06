import { ProductsRepository } from "@app/products/application/repositories/product.repository";
import { Product } from "@app/products/types/product";
import { Service } from "@core/application";
import { PaginationDto } from "@core/infrastructure/dtos/pagination.dto";
import { UnexpectedExceptionHandler } from "@core/infrastructure/exceptions/unexpected-error.exception";
import { BaseException, Result } from "@core/utils";

export class GetAllProductsService
  implements Service<PaginationDto, Product[]>
{
  name: string = this.constructor.name;

  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(
    request: PaginationDto
  ): Promise<Result<Product[], BaseException>> {
    try {
      const { limit = 10, offset = 0 } = request;
      const products = await this.productsRepository.getAll(limit, offset);

      return Result.makeOk(products.unwrap());
    } catch (error) {
      return UnexpectedExceptionHandler.handle(error, this.name);
    }
  }
}

export class GetAllProductsServiceException extends BaseException {
  static code = "GET_ALL_PRODUCTS_SERVICE_EXCEPTION";
  constructor(message: string, cause?: BaseException) {
    super(message, GetAllProductsServiceException.code, cause);
  }
}
