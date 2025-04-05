import { HttpResponseMapper } from "@core/infraestructure/decorators";
import { Request, Response } from "express";

export class OrdersController {
  constructor() {}

  @HttpResponseMapper(201)
  async placeOrder(req: Request, res: Response) {}
}
