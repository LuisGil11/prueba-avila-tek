import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import { JwtService } from "../services";
import { UserRole } from "@app/auth/domain/value-objects";
import { PinoLogger } from "@core/infraestructure";

const tokenService = new JwtService();
const logger = PinoLogger.getInstance();

export const authenticate =
  (validRoles: UserRole[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { headers } = req;

    const { authorization } = headers;

    const token = authorization?.split("Bearer ")[1];

    if (!token) {
      res
        .status(401)
        .json({
          status: 401,
          message: "Unauthorized. A token needs to be provided.",
        })
        .send();
      return;
    }

    try {
      const tokenPayload = tokenService.decodeToken(token);
      if (!tokenPayload) {
        res
          .status(401)
          .json({ status: 401, message: "Unauthorized. Invalid token." })
          .send();
        return;
      }

      const userRole = UserRole[tokenPayload.role as keyof typeof UserRole];

      if (!userRole) {
        res
          .status(401)
          .json({
            status: 401,
            message:
              "Unauthorized. The token does not contain a valid user role.",
          })
          .send();
        return;
      }

      if (!validRoles.includes(userRole)) {
        res
          .status(403)
          .json({
            status: 403,
            message: `Forbidden. The user role '${userRole}' does not have permission to access this resource.`,
          })
          .send();
        return;
      }

      next();
    } catch (error) {
      logger.error(
        "Unexpected error in authentication middleware",
        JSON.stringify(error)
      );
      res.status(401).json({ message: "Unauthorized" }).send();
    }
  };
