import { Router } from "express";
import { ProductsController } from "./products.controller";
import { validate } from "@core/infraestructure/middleware";
import createProductSchema from "./schemas/create-product.schema";

const router = Router();
const productsController = new ProductsController();

router.get("/", productsController.getAll.bind(productsController));
router.get("/:id", productsController.getById.bind(productsController));
router.put("/:id", productsController.update.bind(productsController));
router.post(
  "/",
  validate(createProductSchema),
  productsController.create.bind(productsController)
);
router.delete("/:id", productsController.delete.bind(productsController));

export default router;
