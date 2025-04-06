import { validate } from "@core/infraestructure/middleware";
import { AuthController } from "./auth.controller";
import { loginSchema, registerSchema } from "./schemas";
import { Router } from "express";
import { ControllerAdapter } from "@core/infraestructure/utils/controller.adapter";

const router = Router();
const authController = new AuthController();

router.post(
  "/",
  validate(registerSchema),
  ControllerAdapter.adaptControllerToExpress(
    authController.register.bind(authController)
  )
);

router.post(
  "/login",
  validate(loginSchema),
  ControllerAdapter.adaptControllerToExpress(
    authController.login.bind(authController)
  )
);

export default router;
