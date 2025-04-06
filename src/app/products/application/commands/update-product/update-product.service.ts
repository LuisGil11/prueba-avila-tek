import { Service } from "@core/application";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { UpdateProductResponse } from "./reponse/update-product.response";
import { Result, BaseException } from "@core/utils";
import { EventStore } from "@core/domain/event-store";
import { EventBus } from "@core/domain/event-bus";
import { ProductsRepository } from "../../repositories/product.repository";
import { Product } from "@app/products/domain/product";
import {
  ProductDescription,
  ProductId,
  ProductName,
  ProductPrice,
  ProductStock,
} from "@app/products/domain/value-objects";
import { ProductNotFoundException } from "../../exceptions";
import { UnexpectedExceptionHandler } from "@core/infraestructure/exceptions/unexpected-error.exception";

export class UpdateProductService
  implements Service<UpdateProductDto, UpdateProductResponse>
{
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly eventStore: EventStore,
    private readonly eventBus: EventBus
  ) {}

  name: string = this.constructor.name;
  async execute(
    request: UpdateProductDto
  ): Promise<Result<UpdateProductResponse, BaseException>> {
    const { id, name, currency, description, price, stock, unit } = request;

    try {
      const currentProduct = await this.productsRepository.findById(id);

      if (!currentProduct.hasValue) {
        return Result.makeFail(
          new ProductNotFoundException(`Product with id ${id} not found`)
        );
      }

      const productId = ProductId.create(id);

      const pastEvents = await this.eventStore.get(id);

      const product = Product.loadFromHistory(productId, pastEvents);

      product.update(
        name ? ProductName.create(name) : undefined,
        description ? ProductDescription.create(description) : undefined,
        price || currency
          ? ProductPrice.create({
              amount: price ? price : product._price?.value.amount!,
              currency: currency ? currency : product._price?.value.currency!,
            })
          : undefined,
        stock || unit
          ? ProductStock.create({
              quantity: stock ? stock : product._stock?.value.quantity!,
              unit: unit ? unit : product._stock?.value.unit!,
            })
          : undefined
      );

      const events = product.pullEvents();

      await this.eventStore.append(productId.value, events);
      this.eventBus.publish(events[0], productId.value);

      return Result.makeOk({
        id: productId.value,
        name: name ? name : product._name?.value!,
        description: description ? description : product._description?.value!,
        price: {
          amount: price ? price : product._price?.value.amount!,
          currency: currency ? currency : product._price?.value.currency!,
        },
        stock: {
          quantity: stock ? stock : product._stock?.value.quantity!,
          unit: unit ? unit : product._stock?.value.unit!,
        },
      });
    } catch (error) {
      return UnexpectedExceptionHandler.handle(error, this.name);
    }
  }
}

export class UpdateProductServiceFailedException extends BaseException {
  static code = "UPDATE_PRODUCT_SERVICE_FAILED_EXCEPTION";

  constructor(message: string, cause?: BaseException) {
    super(message, UpdateProductServiceFailedException.code, cause);
  }
}
