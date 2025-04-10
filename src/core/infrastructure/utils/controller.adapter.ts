import { BaseException, Result } from "@core/utils";
import { Request, RequestHandler, Response } from "express";
import { HttpResponse } from "../types";

export class ControllerAdapter {
  static adaptControllerToExpress<T>(
    controllerFn: (
      req: Request<any, any, any, any>,
      res: Response<HttpResponse<T>>
    ) => Promise<Result<T, BaseException>>
  ): RequestHandler {
    return async (req, res, next) => {
      try {
        await controllerFn(req, res);
      } catch (error) {
        next(error);
      }
    };
  }
}
