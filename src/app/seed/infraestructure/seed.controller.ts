import { seedData } from "../data/seed-data";
import { CreateProductService } from "@app/products/application/commands/create-product/create-product.service";
import { PostgresEventStore } from "@core/infraestructure/utils/postgres-event-store";
import { UuidGenerator } from "@core/infraestructure/utils/uuid.generator.service";
import { EventEmitterBus } from "@core/infraestructure/utils/event-emitter-bus";
import { Request, Response } from "express";
import { SeedService } from "../seed.service";
import { RegisterUserService } from "@app/auth/application/commands/register";
import { PostgresUserRepository } from "@app/auth/infraestructure/repositories";
import {
  BCryptPasswordEncripterService,
  JwtService,
} from "@app/auth/infraestructure/services";

export class SeedController {
  private readonly createProductService: CreateProductService;
  private readonly registerUserService: RegisterUserService;
  private readonly seedService: SeedService;
  constructor() {
    this.createProductService = new CreateProductService(
      new PostgresEventStore(),
      new UuidGenerator(),
      EventEmitterBus.getInstance()
    );

    this.registerUserService = new RegisterUserService(
      new PostgresUserRepository(),
      new BCryptPasswordEncripterService(),
      new PostgresEventStore(),
      new UuidGenerator(),
      new JwtService(),
      EventEmitterBus.getInstance()
    );

    this.seedService = new SeedService();
  }

  async executeSeed(req: Request, res: Response) {
    await this.seedService.clearDB();

    for (const product of seedData.products) {
      await this.createProductService.execute(product);
    }
    for (const user of seedData.users) {
      await this.registerUserService.execute(user);
    }

    res
      .status(201)
      .json({
        message: "Seed executed successfully",
      })
      .send();
  }
}
