import { Router } from "express";
import { OrdersController } from "./orders.controller";
import { authenticate } from "@app/auth/infrastructure/middlewares";
import { UserRole } from "@app/auth/domain/value-objects";
import { validate } from "@core/infrastructure/middleware";
import placeOrderSchema from "./schemas/place-order.schema";
import paginationSchema from "@core/infrastructure/schemas/pagination.schema";
import getOrderByIdSchema from "./schemas/get-order-by-id.schema";
import changeOrderStatusSchema from "./schemas/change-order-status.schema";
import { ControllerAdapter } from "@core/infrastructure/utils/controller.adapter";
import getAllOrdersSchema from "./schemas/get-all-orders.schema";

const router = Router();
const ordersController = new OrdersController();

router.post(
  "/",
  authenticate([UserRole.ADMIN, UserRole.USER]),
  validate(placeOrderSchema),
  ControllerAdapter.adaptControllerToExpress(
    ordersController.placeOrder.bind(ordersController)
  )
);

router.get(
  "/",
  authenticate([UserRole.ADMIN, UserRole.USER]),
  validate(getAllOrdersSchema),
  ControllerAdapter.adaptControllerToExpress(
    ordersController.getOrdersByUserId.bind(ordersController)
  )
);

router.get(
  "/all",
  authenticate([UserRole.ADMIN]),
  validate(getAllOrdersSchema),
  ControllerAdapter.adaptControllerToExpress(
    ordersController.getAll.bind(ordersController)
  )
);

router.get(
  "/:id",
  authenticate([UserRole.ADMIN, UserRole.USER]),
  validate(getOrderByIdSchema),
  ControllerAdapter.adaptControllerToExpress(
    ordersController.getById.bind(ordersController)
  )
);

router.put(
  "/status/:id",
  authenticate([UserRole.ADMIN]),
  validate(changeOrderStatusSchema),
  ControllerAdapter.adaptControllerToExpress(
    ordersController.changeOrderStatus.bind(ordersController)
  )
);

export default router;
