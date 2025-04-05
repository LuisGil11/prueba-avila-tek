import { seedData } from "../data/seed-data";
import { CreateProductService } from "@app/products/application/commands/create-product/create-product.service";
import { PostgresEventStore } from "@core/infraestructure/postgres-event-store";
import { UuidGenerator } from "@core/infraestructure/uuid.generator.service";
import { EventEmitterBus } from "@core/infraestructure/event-emitter-bus";
import { Request, Response } from "express";

export class SeedController {
  private readonly createProductService: CreateProductService;
  constructor() {
    this.createProductService = new CreateProductService(
      new PostgresEventStore(),
      new UuidGenerator(),
      EventEmitterBus.getInstance()
    );
  }

  async executeSeed(req: Request, res: Response) {
    for (const product of seedData.products) {
      await this.createProductService.execute(product);
    }

    res
      .status(201)
      .json({
        message: "Seed executed successfully",
      })
      .send();
  }
}
