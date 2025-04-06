import { Service } from "@core/application";
import { DeleteProductDto } from "./dtos/delete-product.dto";
import { DeleteProductResponse } from "./response/delete-product.response";
import { Result, BaseException } from "@core/utils";
import { ProductsRepository } from "../../repositories/product.repository";
import { ProductNotFoundException } from "../../exceptions";
import { UnexpectedExceptionHandler } from "@core/infrastructure/exceptions/unexpected-error.exception";

export class DeleteProductService
  implements Service<DeleteProductDto, DeleteProductResponse>
{
  constructor(private readonly productRepository: ProductsRepository) {}

  name: string = this.constructor.name;
  async execute(
    request: DeleteProductDto
  ): Promise<Result<DeleteProductResponse, BaseException>> {
    const { id } = request;

    try {
      const product = await this.productRepository.findById(id);

      if (!product) {
        return Result.makeFail(
          new ProductNotFoundException(`Product with id ${id} not found`)
        );
      }

      const result = await this.productRepository.delete(id);

      if (!result.hasValue) {
        return Result.makeFail(
          new DeleteProductServiceException(
            `Error deleting product with id ${id}`
          )
        );
      }

      return Result.makeOk(product.unwrap());
    } catch (error) {
      return UnexpectedExceptionHandler.handle(error, this.name);
    }
  }
}

export class DeleteProductServiceException extends BaseException {
  static code = "DELETE_PRODUCT_SERVICE_EXCEPTION";

  constructor(message: string, cause?: BaseException) {
    super(message, DeleteProductServiceException.code, cause);
  }
}
