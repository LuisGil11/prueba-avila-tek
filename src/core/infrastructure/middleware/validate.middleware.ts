import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

export const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        params: req.params,
        body: req.body,
        query: req.query,
      });
      next();
    } catch (err) {
      res
        .status(400)
        .json({
          status: 400,
          error: (err as { errors: string[] }).errors,
        })
        .send();
      return;
    }
  };
