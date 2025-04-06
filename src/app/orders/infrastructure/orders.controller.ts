import { HttpResponseMapper } from "@core/infrastructure/decorators";
import { Request, Response } from "express";
import { PlaceOrderDto } from "../application/commands/place-order/dtos/place-order.dto";
import { PlaceOrderResponse } from "../application/commands/place-order/response/place-order.response";
import { PlaceOrderService } from "../application/commands/place-order/place-order.service";
import {
  LoggerDecorator,
  PerformanceDecorator,
  Service,
} from "@core/application";
import { HttpResponse, PinoLogger } from "@core/infrastructure";
import { EventEmitterBus } from "@core/infrastructure/utils/event-emitter-bus";
import { PostgresEventStore } from "@core/infrastructure/utils/postgres-event-store";
import { PostgresProductsRepository } from "@app/products/infrastructure/repositories/postgres-products.repository";
import { InfraCurrencyConverter } from "./services/currency-converter";
import { UuidGenerator } from "@core/infrastructure/utils/uuid.generator.service";
import { Order } from "../application/responses/order.response";
import { GetOrdersByUserIdDto } from "./queries/get-orders-by-user-id/dtos/get-orders-by-user-id.dto";
import { GetAllOrdersService, GetOrderByIdService } from "./queries";
import { PostgresOrdersRepository } from "./repositories/postgres-orders.repository";
import { OrdersRepository } from "../application/repositories/orders.repository";
import { GetOrdersByUserIdService } from "./queries/get-orders-by-user-id/get-orders-by-user-id.service";
import { PlaceOrderRequestBody } from "./requests/place-order.request";
import { ChangeOrderStatusDto } from "../application/commands/change-order-status/dtos/change-order-status.dto";
import { ChangeOrderStatusResponse } from "../application/commands/change-order-status/responses/change-order-status.response";
import { ChangeOrderStatusService } from "../application/commands/change-order-status/change-order-status.service";
import {
  UnexpectedException,
  UnexpectedExceptionHandler,
} from "@core/infrastructure/exceptions/unexpected-error.exception";
import { OrderStatus } from "../domain/value-objects/status";
import { GetAllOrdersDto } from "./queries/dtos/get-all-orders.dto";

export class OrdersController {
  private readonly placeOrderService: Service<
    PlaceOrderDto,
    PlaceOrderResponse
  >;

  private readonly getAllOrdersService: Service<GetAllOrdersDto, Order[]>;
  private readonly getOrdersByUserIdService: Service<
    GetOrdersByUserIdDto,
    Order[]
  >;
  private readonly getOrderByIdService: Service<string, Order>;

  private readonly changeOrderStatusService: Service<
    ChangeOrderStatusDto,
    ChangeOrderStatusResponse
  >;

  private readonly logger = PinoLogger.getInstance();

  private readonly postgresOrdersRepository: OrdersRepository;

  constructor() {
    const eventStore = new PostgresEventStore();

    this.placeOrderService = new LoggerDecorator(
      this.logger,
      new PerformanceDecorator(
        new PlaceOrderService(
          EventEmitterBus.getInstance(),
          eventStore,
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

    this.changeOrderStatusService = new LoggerDecorator(
      this.logger,
      new PerformanceDecorator(
        new ChangeOrderStatusService(
          eventStore,
          EventEmitterBus.getInstance(),
          this.postgresOrdersRepository
        ),
        this.logger
      )
    );
  }

  @HttpResponseMapper(201)
  async placeOrder(
    req: Request<{}, {}, PlaceOrderRequestBody>,
    res: Response<HttpResponse<PlaceOrderResponse>>
  ) {
    try {
      const result = await this.placeOrderService.execute({
        ...req.body,
        userId: res.locals.userId,
      });

      return result;
    } catch (error) {
      return UnexpectedExceptionHandler.handle(
        error,
        `${this.constructor.name}.placeOrder`
      );
    }
  }

  @HttpResponseMapper(200)
  async getById(
    req: Request<{ id: string }>,
    res: Response<HttpResponse<Order>>
  ) {
    try {
      return await this.getOrderByIdService.execute(req.params.id);
    } catch (error) {
      return UnexpectedExceptionHandler.handle(
        error,
        `${this.constructor.name}.getById`
      );
    }
  }

  @HttpResponseMapper(200)
  async getAll(
    req: Request<
      {},
      {},
      {},
      { limit: string; offset: string; status?: OrderStatus }
    >,
    res: Response<HttpResponse<Order[]>>
  ) {
    try {
      const { limit, offset, status } = req.query;
      const result = await this.getAllOrdersService.execute({
        limit: Number(limit) || 10,
        offset: Number(offset) || 0,
        status,
      });
      return result;
    } catch (error) {
      return UnexpectedExceptionHandler.handle(
        error,
        `${this.constructor.name}.getAll`
      );
    }
  }

  @HttpResponseMapper(200)
  async getOrdersByUserId(
    req: Request<
      {},
      {},
      {},
      { limit: string; offset: string; status?: OrderStatus }
    >,
    res: Response<HttpResponse<Order[]>>
  ) {
    try {
      const { limit, offset, status } = req.query;
      const userId = res.locals.userId;
      const result = await this.getOrdersByUserIdService.execute({
        limit: Number(limit) || 10,
        offset: Number(offset) || 0,
        id: userId,
        status,
      });
      return result;
    } catch (error) {
      return UnexpectedExceptionHandler.handle(
        error,
        `${this.constructor.name}.getOrdersByUserId`
      );
    }
  }

  @HttpResponseMapper(202)
  async changeOrderStatus(
    req: Request<{ id: string }, {}, ChangeOrderStatusDto>,
    res: Response<HttpResponse<ChangeOrderStatusResponse>>
  ) {
    const { status } = req.body;
    const { id } = req.params;

    try {
      const result = await this.changeOrderStatusService.execute({
        orderId: id,
        status,
      });
      return result;
    } catch (error) {
      return UnexpectedExceptionHandler.handle(
        error,
        `${this.constructor.name}.changeOrderStatus`
      );
    }
  }
}
