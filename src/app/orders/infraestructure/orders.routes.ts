import { Router } from "express";
import { OrdersController } from "./orders.controller";
import { authenticate } from "@app/auth/infraestructure/middlewares";
import { UserRole } from "@app/auth/domain/value-objects";

const router = Router();
const ordersController = new OrdersController();

router.post(
  "/",
  authenticate([UserRole.ADMIN, UserRole.USER]),
  ordersController.placeOrder.bind(ordersController)
);

export default router;
