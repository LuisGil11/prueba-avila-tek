import { Router } from "express";
import { ProductsController } from "./products.controller";
import { validate } from "@core/infrastructure/middleware";
import {
  createProductSchema,
  deleteProductSchema,
  getAllProductsSchema,
  getProductByIdSchema,
  updateProductSchema,
} from "./schemas";
import { authenticate } from "@app/auth/infrastructure/middlewares";
import { UserRole } from "@app/auth/domain/value-objects";
import { ControllerAdapter } from "@core/infrastructure/utils/controller.adapter";

const router = Router();
const productsController = new ProductsController();

router.get(
  "/",
  validate(getAllProductsSchema),
  ControllerAdapter.adaptControllerToExpress(
    productsController.getAll.bind(productsController)
  )
);
router.get(
  "/:id",
  validate(getProductByIdSchema),
  ControllerAdapter.adaptControllerToExpress(
    productsController.getById.bind(productsController)
  )
);
router.put(
  "/:id",
  authenticate([UserRole.ADMIN]),
  validate(updateProductSchema),
  ControllerAdapter.adaptControllerToExpress(
    productsController.update.bind(productsController)
  )
);
router.post(
  "/",
  authenticate([UserRole.ADMIN]),
  validate(createProductSchema),
  ControllerAdapter.adaptControllerToExpress(
    productsController.create.bind(productsController)
  )
);
router.delete(
  "/:id",
  authenticate([UserRole.ADMIN]),
  validate(deleteProductSchema),
  ControllerAdapter.adaptControllerToExpress(
    productsController.delete.bind(productsController)
  )
);

export default router;
