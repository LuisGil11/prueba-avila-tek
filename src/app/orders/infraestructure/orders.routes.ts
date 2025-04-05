import { Router } from "express";
import { OrdersController } from "./orders.controller";
import { authenticate } from "@app/auth/infraestructure/middlewares";
import { UserRole } from "@app/auth/domain/value-objects";
import { validate } from "@core/infraestructure/middleware";
import placeOrderSchema from "./schemas/place-order.schema";
import paginationSchema from "@core/infraestructure/schemas/pagination.schema";
import getOrderByIdSchema from "./schemas/get-order-by-id.schema";

const router = Router();
const ordersController = new OrdersController();

router.post(
  "/",
  authenticate([UserRole.ADMIN, UserRole.USER]),
  validate(placeOrderSchema),
  authenticate([UserRole.ADMIN, UserRole.USER]),
  ordersController.placeOrder.bind(ordersController)
);

router.get(
  "/",
  validate(paginationSchema),
  authenticate([UserRole.ADMIN, UserRole.USER]),
  ordersController.getOrdersByUserId.bind(ordersController)
);

router.get(
  "/all",
  validate(paginationSchema),
  authenticate([UserRole.ADMIN]),
  ordersController.getAll.bind(ordersController)
);

router.get(
  "/:id",
  validate(getOrderByIdSchema),
  authenticate([UserRole.ADMIN, UserRole.USER]),
  ordersController.getById.bind(ordersController)
);

export default router;
