import { Request, Response } from "express";
import { RegisterUserService } from "../application/commands/register/register-user.service";
import { PostgresUserRepository } from "./repositories/postgres-user.repository";
import { CreateUserDto } from "../application/commands/register/create-user.dto";
import { BCryptPasswordEncripterService } from "./services/bcrypt-password-encripter.service";
import {
  LoggerDecorator,
  PerformanceDecorator,
  Service,
} from "@core/application";
import { HttpResponse, PinoLogger } from "@core/infrastructure";
import { HttpResponseMapper } from "@core/infrastructure/decorators";
import { BaseException, Result } from "@core/utils";
import { PostgresEventStore } from "@core/infrastructure/utils/postgres-event-store";
import { UuidGenerator } from "@core/infrastructure/utils/uuid.generator.service";
import { JwtService } from "./services";
import { EventEmitterBus } from "@core/infrastructure/utils/event-emitter-bus";
import { LoginDto } from "../application/commands/login/login.dto";
import { AuthorizedResponse } from "../application/commands/response/authorized.response";
import { LoginService } from "../application/commands/login";
import {
  UnexpectedException,
  UnexpectedExceptionHandler,
} from "@core/infrastructure/exceptions/unexpected-error.exception";

export class AuthController {
  private readonly registerUserService: Service<
    CreateUserDto,
    AuthorizedResponse
  >;

  private readonly loginService: Service<LoginDto, AuthorizedResponse>;
  private readonly logger = PinoLogger.getInstance();

  constructor() {
    const postgresUserRepository = new PostgresUserRepository();
    const passwordEncripter = new BCryptPasswordEncripterService();
    const postgresEventStore = new PostgresEventStore();
    const uuidGenerator = new UuidGenerator();
    const tokenService = new JwtService();
    const eventEmitterBus = EventEmitterBus.getInstance();

    this.registerUserService = new LoggerDecorator(
      this.logger,
      new PerformanceDecorator(
        new RegisterUserService(
          postgresUserRepository,
          passwordEncripter,
          postgresEventStore,
          uuidGenerator,
          tokenService,
          eventEmitterBus
        ),
        this.logger
      )
    );

    this.loginService = new LoggerDecorator(
      this.logger,
      new PerformanceDecorator(
        new LoginService(
          postgresUserRepository,
          passwordEncripter,
          tokenService
        ),
        this.logger
      )
    );
  }

  @HttpResponseMapper(201)
  async register(
    req: Request<{}, {}, CreateUserDto>,
    res: Response<HttpResponse<AuthorizedResponse>>
  ) {
    try {
      const result = await this.registerUserService.execute(req.body);
      return result;
    } catch (error) {
      return UnexpectedExceptionHandler.handle(
        error,
        `${this.constructor.name}.register`
      );
    }
  }

  @HttpResponseMapper(200)
  async login(
    req: Request<{}, {}, LoginDto>,
    res: Response<HttpResponse<AuthorizedResponse>>
  ) {
    try {
      const result = await this.loginService.execute(req.body);
      return result;
    } catch (error) {
      return UnexpectedExceptionHandler.handle(
        error,
        `${this.constructor.name}.login`
      );
    }
  }
}
