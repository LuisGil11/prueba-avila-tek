import { Router } from "express";
import { ProductsController } from "./products.controller";
import { validate } from "@core/infraestructure/middleware";
import {
  createProductSchema,
  deleteProductSchema,
  getAllProductsSchema,
  getProductByIdSchema,
  updateProductSchema,
} from "./schemas";
import { authenticate } from "@app/auth/infraestructure/middlewares";
import { UserRole } from "@app/auth/domain/value-objects";

const router = Router();
const productsController = new ProductsController();

router.get(
  "/",
  validate(getAllProductsSchema),
  productsController.getAll.bind(productsController)
);
router.get(
  "/:id",
  validate(getProductByIdSchema),
  productsController.getById.bind(productsController)
);
router.put(
  "/:id",
  authenticate([UserRole.ADMIN]),
  validate(updateProductSchema),
  productsController.update.bind(productsController)
);
router.post(
  "/",
  authenticate([UserRole.ADMIN]),
  validate(createProductSchema),
  productsController.create.bind(productsController)
);
router.delete(
  "/:id",
  authenticate([UserRole.ADMIN]),
  validate(deleteProductSchema),
  productsController.delete.bind(productsController)
);

export default router;
