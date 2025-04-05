import { LoginServiceFailedException } from "@app/auth/application/commands/login";
import { RegisterUserServiceFailedExceptionCodes } from "@app/auth/application/commands/register";
import {
  UserIdCreationFailedException,
  UserMailCreationFailedException,
  UserNameCreationFailedException,
  UserPasswordCreationFailedException,
} from "@app/auth/domain/value-objects";
import { DeleteProductServiceException } from "@app/products/application/commands/delete-product";
import { ProductNotFoundException } from "@app/products/application/exceptions";
import { ProductBadRequestException } from "@app/products/application/exceptions/product-bad-request.exception";
import {
  InvalidProductStateException,
  InvalidProductUpdateException,
} from "@app/products/domain/product";
import {
  ProductDescriptionCreationFailedException,
  ProductIdCreationFailedException,
  ProductNameCreationFailedException,
  ProductPriceCreationFailedException,
  ProductStockCreationFailedException,
} from "@app/products/domain/value-objects";
import { GetAllProductsServiceException } from "@app/products/infraestructure/queries/get-all-products.service";
import { HttpResponse } from "@core/infraestructure/types";
import { BaseException, Result } from "@core/utils";
import { Response } from "express";

export function HttpResponseMapper(okStatus: number = 200) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const res: Response<HttpResponse<unknown>> = args[1];

      const result: Result<unknown, BaseException> = await originalMethod.apply(
        this,
        args
      );

      if (result.isOk()) {
        const response = res.status(okStatus).json({
          status: okStatus,
          data: result.getValue(),
        });

        response.send();
        return;
      }

      const httpErrorCode = errorMapper(result.getError().code);

      const response = res.status(httpErrorCode).json({
        status: httpErrorCode,
        error: result.getError().message,
      });

      response.send();
    };
  };
}

const badRequestExceptions: string[] = [
  RegisterUserServiceFailedExceptionCodes.USER_ALREADY_EXISTS,
  UserIdCreationFailedException.code,
  UserMailCreationFailedException.code,
  UserPasswordCreationFailedException.code,
  UserNameCreationFailedException.code,
  LoginServiceFailedException.code,
  ProductIdCreationFailedException.code,
  ProductNameCreationFailedException.code,
  ProductDescriptionCreationFailedException.code,
  ProductPriceCreationFailedException.code,
  ProductStockCreationFailedException.code,
  InvalidProductUpdateException.code,
  InvalidProductStateException.code,
  DeleteProductServiceException.code,
  ProductBadRequestException.code,
];

const internalServerErrorExceptions: string[] = [
  GetAllProductsServiceException.code,
];

const notFoundExceptions: string[] = [ProductNotFoundException.code];

const errorMapper = (errorCode: string) => {
  if (badRequestExceptions.includes(errorCode)) {
    return 400;
  }

  if (notFoundExceptions.includes(errorCode)) {
    return 404;
  }

  if (internalServerErrorExceptions.includes(errorCode)) {
    return 500;
  }

  return 500;
};
