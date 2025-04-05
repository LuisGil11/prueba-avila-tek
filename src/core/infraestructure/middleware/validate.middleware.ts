import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

export const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      res
        .status(400)
        .json({
          status: 400,
          error: (error as Error).message,
        })
        .send();
      res.send();
      return;
    }
  };
