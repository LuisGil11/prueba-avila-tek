import { HttpResponseMapper } from "@core/infraestructure/decorators";
import { Request, Response } from "express";
import { PlaceOrderDto } from "../application/commands/place-order/dtos/place-order.dto";
import { PlaceOrderResponse } from "../application/commands/place-order/response/place-order.response";
import { PlaceOrderService } from "../application/commands/place-order/place-order.service";
import {
  LoggerDecorator,
  PerformanceDecorator,
  Service,
} from "@core/application";
import { PinoLogger } from "@core/infraestructure";
import { EventEmitterBus } from "@core/infraestructure/event-emitter-bus";
import { PostgresEventStore } from "@core/infraestructure/postgres-event-store";
import { PostgresProductsRepository } from "@app/products/infraestructure/repositories/postgres-products.repository";
import { InfraCurrencyConverter } from "./services/currency-converter";
import { UuidGenerator } from "@core/infraestructure/uuid.generator.service";
import { PaginationDto } from "@core/infraestructure/dtos/pagination.dto";
import { Order } from "../application/responses/order.response";
import { GetOrdersByUserIdDto } from "./queries/get-orders-by-user-id/dtos/get-orders-by-user-id.dto";
import { GetAllOrdersService, GetOrderByIdService } from "./queries";
import { PostgresOrdersRepository } from "./repositories/postgres-orders.repository";
import { OrdersRepository } from "../application/repositories/orders.repository";
import { GetOrdersByUserIdService } from "./queries/get-orders-by-user-id/get-orders-by-user-id.service";
import { BaseException, Result } from "@core/utils";
import { PlaceOrderRequestBody } from "./requests/place-order.request";

export class OrdersController {
  private readonly placeOrderService: Service<
    PlaceOrderDto,
    PlaceOrderResponse
  >;

  private readonly getAllOrdersService: Service<PaginationDto, Order[]>;
  private readonly getOrdersByUserIdService: Service<
    GetOrdersByUserIdDto,
    Order[]
  >;
  private readonly getOrderByIdService: Service<string, Order>;

  private readonly logger = PinoLogger.getInstance();

  private readonly postgresOrdersRepository: OrdersRepository;

  constructor() {
    this.placeOrderService = new LoggerDecorator(
      this.logger,
      new PerformanceDecorator(
        new PlaceOrderService(
          EventEmitterBus.getInstance(),
          new PostgresEventStore(),
          new PostgresProductsRepository(),
          new InfraCurrencyConverter(),
          new UuidGenerator()
        ),
        this.logger
      )
    );

    this.postgresOrdersRepository = new PostgresOrdersRepository();

    this.getAllOrdersService = new LoggerDecorator(
      this.logger,
      new PerformanceDecorator(
        new GetAllOrdersService(this.postgresOrdersRepository),
        this.logger
      )
    );
    this.getOrdersByUserIdService = new LoggerDecorator(
      this.logger,
      new PerformanceDecorator(
        new GetOrdersByUserIdService(this.postgresOrdersRepository),
        this.logger
      )
    );
    this.getOrderByIdService = new LoggerDecorator(
      this.logger,
      new PerformanceDecorator(
        new GetOrderByIdService(this.postgresOrdersRepository),
        this.logger
      )
    );
  }

  @HttpResponseMapper(201)
  async placeOrder(
    req: Request<{}, {}, PlaceOrderRequestBody>,
    res: Response<PlaceOrderResponse>
  ) {
    const result = await this.placeOrderService.execute({
      ...req.body,
      userId: res.locals.userId,
    });

    console.log(result.getValue());

    return result;
  }

  @HttpResponseMapper(200)
  async getById(req: Request<{ id: string }>, res: Response) {
    try {
      return await this.getOrderByIdService.execute(req.params.id);
    } catch (error) {
      if (error instanceof BaseException) {
        this.logger.error(error.message, JSON.stringify(error));
        return Result.makeFail(error as BaseException);
      }
      this.logger.warn("Unhandled error was triggered in GetOrderByIdService");

      return Result.makeFail(error as BaseException);
    }
  }

  @HttpResponseMapper(200)
  async getAll(
    req: Request<{}, {}, {}, { limit: string; offset: string }>,
    res: Response
  ) {
    try {
      const { limit, offset } = req.query;
      const result = await this.getAllOrdersService.execute({
        limit: Number(limit) || 10,
        offset: Number(offset) || 0,
      });
      return result;
    } catch (error) {
      if (error instanceof BaseException) {
        this.logger.error(error.message, JSON.stringify(error));
        return Result.makeFail(error as BaseException);
      }
      this.logger.warn("Unhandled error was triggered in GetAllOrdersService");

      return Result.makeFail(error as BaseException);
    }
  }

  @HttpResponseMapper(200)
  async getOrdersByUserId(
    req: Request<{}, {}, {}, { limit: string; offset: string }>,
    res: Response
  ) {
    try {
      const { limit, offset } = req.query;
      const userId = res.locals.userId;
      const result = await this.getOrdersByUserIdService.execute({
        limit: Number(limit) || 10,
        offset: Number(offset) || 0,
        id: userId,
      });
      return result;
    } catch (error) {
      if (error instanceof BaseException) {
        this.logger.error(error.message, JSON.stringify(error));
        return Result.makeFail(error as BaseException);
      }
      this.logger.warn(
        "Unhandled error was triggered in GetOrdersByUserIdService"
      );

      return Result.makeFail(error as BaseException);
    }
  }
}
