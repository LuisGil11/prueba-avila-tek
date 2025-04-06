import { HttpResponseMapper } from "@core/infrastructure/decorators";
import { Request, Response } from "express";
import {
  CreateProductDto,
  CreateProductResponse,
} from "../application/commands/create-product";
import { HttpResponse, PinoLogger } from "@core/infrastructure";
import {
  LoggerDecorator,
  PerformanceDecorator,
  Service,
} from "@core/application";
import { CreateProductService } from "../application/commands/create-product/create-product.service";
import { EventEmitterBus } from "@core/infrastructure/utils/event-emitter-bus";
import { PostgresEventStore } from "@core/infrastructure/utils/postgres-event-store";
import { UuidGenerator } from "@core/infrastructure/utils/uuid.generator.service";
import {
  UpdateProductDto,
  UpdateProductResponse,
  UpdateProductService,
} from "../application/commands/update-product";
import { PostgresProductsRepository } from "./repositories/postgres-products.repository";
import { UpdateProductRequestBody } from "./requests/update-product.request";
import { PaginationDto } from "@core/infrastructure/dtos/pagination.dto";
import { GetAllProductsService } from "./queries/get-all-products.service";
import { Product } from "../types/product";
import { GetProductByIdService } from "./queries/get-product-by-id.service";
import {
  DeleteProductDto,
  DeleteProductResponse,
  DeleteProductService,
} from "../application/commands/delete-product";
import { UnexpectedExceptionHandler } from "@core/infrastructure/exceptions/unexpected-error.exception";

export class ProductsController {
  private readonly createProductService: Service<
    CreateProductDto,
    CreateProductResponse
  >;
  private readonly updateProductService: Service<
    UpdateProductDto,
    UpdateProductResponse
  >;

  private readonly deleteProductService: Service<
    DeleteProductDto,
    DeleteProductResponse
  >;

  private readonly getAllProductsService: Service<PaginationDto, Product[]>;

  private readonly getProductById: Service<string, Product>;

  private readonly logger = PinoLogger.getInstance();

  constructor() {
    const postgresEventStore = new PostgresEventStore();
    const uuidGenerator = new UuidGenerator();
    const eventEmitterBus = EventEmitterBus.getInstance();
    const productsRepository = new PostgresProductsRepository();

    this.createProductService = new LoggerDecorator(
      this.logger,
      new PerformanceDecorator(
        new CreateProductService(
          postgresEventStore,
          uuidGenerator,
          eventEmitterBus
        ),
        this.logger
      )
    );

    this.updateProductService = new LoggerDecorator(
      this.logger,
      new PerformanceDecorator(
        new UpdateProductService(
          productsRepository,
          postgresEventStore,
          eventEmitterBus
        ),
        this.logger
      )
    );
    this.deleteProductService = new LoggerDecorator(
      this.logger,
      new PerformanceDecorator(
        new DeleteProductService(productsRepository),
        this.logger
      )
    );

    this.getAllProductsService = new LoggerDecorator(
      this.logger,
      new PerformanceDecorator(
        new GetAllProductsService(productsRepository),
        this.logger
      )
    );

    this.getProductById = new LoggerDecorator(
      this.logger,
      new PerformanceDecorator(
        new GetProductByIdService(productsRepository),
        this.logger
      )
    );
  }

  @HttpResponseMapper(200)
  async getById(
    req: Request<{ id: string }>,
    res: Response<HttpResponse<Product>>
  ) {
    try {
      return await this.getProductById.execute(req.params.id);
    } catch (error) {
      return UnexpectedExceptionHandler.handle(
        error,
        `${this.constructor.name}.getById`
      );
    }
  }
  @HttpResponseMapper(200)
  async getAll(
    req: Request<{}, {}, {}, { limit: string; offset: string }>,
    res: Response
  ) {
    try {
      const { limit, offset } = req.query;
      const result = await this.getAllProductsService.execute({
        limit: Number(limit) || 10,
        offset: Number(offset) || 0,
      });
      return result;
    } catch (error) {
      return UnexpectedExceptionHandler.handle(
        error,
        `${this.constructor.name}.getAll`
      );
    }
  }

  @HttpResponseMapper(201)
  async create(
    req: Request<{}, {}, CreateProductDto>,
    res: Response<HttpResponse<CreateProductResponse>>
  ) {
    try {
      const result = await this.createProductService.execute(req.body);
      return result;
    } catch (error) {
      return UnexpectedExceptionHandler.handle(
        error,
        `${this.constructor.name}.create`
      );
    }
  }

  @HttpResponseMapper(200)
  async update(
    req: Request<{ id: string }, {}, UpdateProductRequestBody>,
    res: Response<HttpResponse<UpdateProductResponse>>
  ) {
    try {
      const dto = {
        id: req.params.id,
        ...req.body,
      };

      const result = await this.updateProductService.execute(dto);
      return result;
    } catch (error) {
      return UnexpectedExceptionHandler.handle(
        error,
        `${this.constructor.name}.update`
      );
    }
  }

  @HttpResponseMapper(200)
  async delete(
    req: Request<{ id: string }>,
    res: Response<HttpResponse<DeleteProductResponse>>
  ) {
    try {
      const { id } = req.params;

      const result = await this.deleteProductService.execute({ id });
      return result;
    } catch (error) {
      return UnexpectedExceptionHandler.handle(
        error,
        `${this.constructor.name}.delete`
      );
    }
  }
}
