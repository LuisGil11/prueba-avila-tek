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
  validate(updateProductSchema),
  productsController.update.bind(productsController)
);
router.post(
  "/",
  validate(createProductSchema),
  productsController.create.bind(productsController)
);
router.delete(
  "/:id",
  validate(deleteProductSchema),
  productsController.delete.bind(productsController)
);

export default router;
