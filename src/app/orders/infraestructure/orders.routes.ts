import { Router } from "express";
import { OrdersController } from "./orders.controller";
import { authenticate } from "@app/auth/infraestructure/middlewares";
import { UserRole } from "@app/auth/domain/value-objects";
import { validate } from "@core/infraestructure/middleware";
import placeOrderSchema from "./schemas/place-order.schema";
import paginationSchema from "@core/infraestructure/schemas/pagination.schema";
import getOrderByIdSchema from "./schemas/get-order-by-id.schema";
import changeOrderStatusSchema from "./schemas/change-order-status.schema";

const router = Router();
const ordersController = new OrdersController();

router.post(
  "/",
  authenticate([UserRole.ADMIN, UserRole.USER]),
  validate(placeOrderSchema),
  ordersController.placeOrder.bind(ordersController)
);

router.get(
  "/",
  authenticate([UserRole.ADMIN, UserRole.USER]),
  validate(paginationSchema),
  ordersController.getOrdersByUserId.bind(ordersController)
);

router.get(
  "/all",
  authenticate([UserRole.ADMIN]),
  validate(paginationSchema),
  ordersController.getAll.bind(ordersController)
);

router.get(
  "/:id",
  authenticate([UserRole.ADMIN, UserRole.USER]),
  validate(getOrderByIdSchema),
  ordersController.getById.bind(ordersController)
);

router.put(
  "/:id",
  authenticate([UserRole.ADMIN]),
  validate(getOrderByIdSchema),
  ordersController.changeOrderStatus.bind(ordersController)
);

router.put(
  "/status/:id",
  authenticate([UserRole.ADMIN]),
  validate(changeOrderStatusSchema),
  ordersController.changeOrderStatus.bind(ordersController)
);

export default router;
