import { Router } from "express";
import registerUserSchema from "./schemas/register-user.schema";
import { validate } from "@core/infraestructure/middleware";
import { AuthController } from "./auth.controller";
import loginSchema from "./schemas/login.schema";

const router = Router();
const authController = new AuthController();

router.post(
  "/",
  validate(registerUserSchema),
  authController.register.bind(authController)
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login.bind(authController)
);

export default router;
