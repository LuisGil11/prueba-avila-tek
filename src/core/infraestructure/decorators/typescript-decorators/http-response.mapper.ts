import { LoginServiceFailedException } from "@app/auth/application/commands/login";
import { RegisterUserServiceFailedExceptionCodes } from "@app/auth/application/commands/register";
import {
  UserIdCreationFailedException,
  UserMailCreationFailedException,
  UserNameCreationFailedException,
  UserPasswordCreationFailedException,
} from "@app/auth/domain/value-objects";
import { ChangeOrderStatusServiceException } from "@app/orders/application/commands/change-order-status/change-order-status.service";
import { PlaceOrderServiceException } from "@app/orders/application/commands/place-order";
import { OrderNotFoundException } from "@app/orders/application/exceptions/order-not-found.exception";
import {
  OrderIdCreationFailedException,
  OrderItemPriceCreationFailedException,
  OrderProductQuantityCreationFailedException,
  OrderTotalCreationFailedException,
} from "@app/orders/domain/value-objects";
import {
  GetAllOrdersServiceException,
  GetOrderByIdServiceException,
} from "@app/orders/infraestructure/queries";
import { GetOrdersByUserIdServiceException } from "@app/orders/infraestructure/queries/get-orders-by-user-id/get-orders-by-user-id.service";
import { CreateProductServiceException } from "@app/products/application/commands/create-product/create-product.service";
import { DeleteProductServiceException } from "@app/products/application/commands/delete-product";
import { UpdateProductServiceFailedException } from "@app/products/application/commands/update-product";
import { ProductNotFoundException } from "@app/products/application/exceptions";
import {
  InsufficientStockException,
  InvalidProductUpdateException,
  UnitNotMatchException,
} from "@app/products/domain/product";
import {
  ProductDescriptionCreationFailedException,
  ProductIdCreationFailedException,
  ProductNameCreationFailedException,
  ProductPriceCreationFailedException,
  ProductStockCreationFailedException,
} from "@app/products/domain/value-objects";
import { GetAllProductsServiceException } from "@app/products/infraestructure/queries/get-all-products.service";
import { GetProductByIdServiceException } from "@app/products/infraestructure/queries/get-product-by-id.service";
import { UnexpectedException } from "@core/infraestructure/exceptions/unexpected-error.exception";
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
  // ? Auth exceptions
  //* Service exceptions
  LoginServiceFailedException.code,
  RegisterUserServiceFailedExceptionCodes.USER_ALREADY_EXISTS,

  //* Domain exceptions
  UserNameCreationFailedException.code,
  UserMailCreationFailedException.code,
  UserPasswordCreationFailedException.code,
  UserIdCreationFailedException.code,

  // ? Product exceptions
  //* Service exceptions
  GetAllProductsServiceException.code,
  GetProductByIdServiceException.code,
  CreateProductServiceException.code,
  UpdateProductServiceFailedException.code,
  DeleteProductServiceException.code,

  //* Domain exceptions
  ProductIdCreationFailedException.code,
  ProductNameCreationFailedException.code,
  ProductDescriptionCreationFailedException.code,
  ProductPriceCreationFailedException.code,
  ProductStockCreationFailedException.code,
  InvalidProductUpdateException.code,

  // ? Orders exceptions
  // * Service exceptions
  PlaceOrderServiceException.code,
  GetAllOrdersServiceException.code,
  GetOrderByIdServiceException.code,
  GetOrdersByUserIdServiceException.code,
  ChangeOrderStatusServiceException.code,

  // * Domain exceptions
  OrderIdCreationFailedException.code,
  OrderItemPriceCreationFailedException.code,
  OrderTotalCreationFailedException.code,
  OrderProductQuantityCreationFailedException.code,
];

const internalServerErrorExceptions: string[] = [UnexpectedException.code];

const conflictExceptions: string[] = [
  UnitNotMatchException.code,
  InsufficientStockException.code,
];

const notFoundExceptions: string[] = [
  ProductNotFoundException.code,
  OrderNotFoundException.code,
];

const errorMapper = (errorCode: string) => {
  if (badRequestExceptions.includes(errorCode)) {
    return 400;
  }

  if (notFoundExceptions.includes(errorCode)) {
    return 404;
  }

  if (conflictExceptions.includes(errorCode)) {
    return 409;
  }

  if (internalServerErrorExceptions.includes(errorCode)) {
    return 500;
  }

  return 500;
};
