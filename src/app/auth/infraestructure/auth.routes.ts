import { Router } from "express";
import { validate } from "@core/infraestructure/middleware";
import { AuthController } from "./auth.controller";
import { loginSchema, registerSchema } from "./schemas";

const router = Router();
const authController = new AuthController();

router.post(
  "/",
  validate(registerSchema),
  authController.register.bind(authController)
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login.bind(authController)
);

export default router;
