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

export class OrdersController {
  private readonly placeOrderService: Service<
    PlaceOrderDto,
    PlaceOrderResponse
  >;
  private readonly logger = PinoLogger.getInstance();

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
  }

  @HttpResponseMapper(201)
  async placeOrder(
    req: Request<{}, {}, PlaceOrderDto>,
    res: Response<PlaceOrderResponse>
  ) {
    const result = await this.placeOrderService.execute(req.body);

    console.log(result.getValue());

    return result;
  }
}
