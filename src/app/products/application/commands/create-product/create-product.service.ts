import { Service } from "@core/application";
import { CreateProductDto } from "./dtos/create-product.dto";
import { CreateProductResponse } from "./response/create-product.response";
import { Result, BaseException } from "@core/utils";
import { EventStore } from "@core/domain/event-store";
import { IdGenerator } from "@core/utils/id/id.generator";
import {
  ProductDescription,
  ProductId,
  ProductName,
  ProductPrice,
  ProductStock,
} from "@app/products/domain/value-objects";
import { Product } from "@app/products/domain/product";
import { EventBus } from "@core/domain/event-bus";

export class CreateProductService
  implements Service<CreateProductDto, CreateProductResponse>
{
  constructor(
    private readonly eventStore: EventStore,
    private readonly idGenerator: IdGenerator,
    private readonly eventBus: EventBus
  ) {}

  name: string = this.constructor.name;
  async execute(
    request: CreateProductDto
  ): Promise<Result<CreateProductResponse, BaseException>> {
    const { name, currency, description, price, stock, unit } = request;

    try {
      const id = this.idGenerator.generate();

      const productId = ProductId.create(id);
      const productName = ProductName.create(name);
      const productDescription = ProductDescription.create(description);
      const productPrice = ProductPrice.create({ amount: price, currency });
      const productStock = ProductStock.create({ quantity: stock, unit });

      const product = Product.create(
        productId,
        productName,
        productDescription,
        productPrice,
        productStock
      );

      const events = product.pullEvents();

      await this.eventStore.append(productId.value, events);

      this.eventBus.publish(events[0], productId.value);

      return Result.makeOk({
        id: productId.value,
        name,
        description,
        price: {
          ...productPrice.value,
        },
        stock: {
          ...productStock.value,
        },
      });
    } catch (error) {
      if (error instanceof BaseException) {
        return Result.makeFail(error);
      } else {
        return Result.makeFail(
          new CreateProductServiceException(
            "An unexpected error occurred while creating the product",
            error as BaseException
          )
        );
      }
    }
  }
}

export class CreateProductServiceException extends BaseException {
  static code = "CREATE_PRODUCT_SERVICE_EXCEPTION";

  constructor(message: string, cause?: BaseException) {
    super(message, CreateProductServiceException.code, cause);
  }
}
