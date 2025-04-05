import { Router } from "express";
import { OrdersController } from "./orders.controller";
import { authenticate } from "@app/auth/infraestructure/middlewares";
import { UserRole } from "@app/auth/domain/value-objects";
import { validate } from "@core/infraestructure/middleware";
import placeOrderSchema from "./schemas/place-order.schema";

const router = Router();
const ordersController = new OrdersController();

router.post(
  "/",
  authenticate([UserRole.ADMIN, UserRole.USER]),
  validate(placeOrderSchema),
  ordersController.placeOrder.bind(ordersController)
);

export default router;
