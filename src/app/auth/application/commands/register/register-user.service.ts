import { Service } from "@core/application";
import { CreateUserDto } from "./create-user.dto";
import { UsersRepository } from "../../repository";
import { PasswordEncripterService, TokenService } from "../../services";
import { BaseException, Result } from "@core/utils";
import { EventStore } from "@core/domain/event-store";
import { IdGenerator } from "@core/utils/id/id.generator";
import {
  HashedPassword,
  UserId,
  UserMail,
  UserName,
  UserPassword,
  UserRole,
} from "@app/auth/domain/value-objects";
import { User as DomainUser } from "@app/auth/domain/user";
import { EventBus } from "@core/domain/event-bus";
import { AuthorizedResponse } from "../response/authorized.response";
import { UnexpectedExceptionHandler } from "@core/infrastructure/exceptions/unexpected-error.exception";

export class RegisterUserService
  implements Service<CreateUserDto, AuthorizedResponse>
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordEncripter: PasswordEncripterService,
    private readonly eventStore: EventStore,
    private readonly idGenerator: IdGenerator,
    private readonly tokenService: TokenService,
    private readonly eventBus: EventBus
  ) {}

  name: string = this.constructor.name;

  async execute(
    request: CreateUserDto
  ): Promise<Result<AuthorizedResponse, RegisterUserServiceFailedException>> {
    const { name, email, password, role } = request;

    try {
      const userByEmail = await this.usersRepository.getUserByEmail(email);

      if (userByEmail.hasValue) {
        const result: Result<
          AuthorizedResponse,
          RegisterUserServiceFailedException
        > = Result.makeFail(
          new RegisterUserServiceFailedException(
            "A user with that email already exists",
            RegisterUserServiceFailedExceptionCodes.USER_ALREADY_EXISTS
          )
        );
        return result;
      }

      const userByUsername = await this.usersRepository.getUserByUsername(name);

      if (userByUsername.hasValue) {
        return Result.makeFail(
          new RegisterUserServiceFailedException(
            "That username is already taken",
            RegisterUserServiceFailedExceptionCodes.USER_ALREADY_EXISTS
          )
        );
      }

      const id = this.idGenerator.generate();
      const userId = UserId.create(id);
      const userName = UserName.create(name);
      const userEmail = UserMail.create(email);
      UserPassword.create(password);
      const userRole = UserRole[role.toUpperCase() as keyof typeof UserRole];

      if (!userRole) {
        return Result.makeFail(
          new RegisterUserServiceFailedException(
            "Invalid user role",
            RegisterUserServiceFailedExceptionCodes.USER_ALREADY_EXISTS
          )
        );
      }

      const encryptedPassword = await this.passwordEncripter.encryptPassword(
        password
      );

      const hashedPassword = HashedPassword.create(encryptedPassword);

      const newUser = DomainUser.create(
        userId,
        userName,
        hashedPassword,
        userEmail,
        userRole
      );

      const events = newUser.pullEvents();

      await this.eventStore.append(newUser.id.value, events);

      const token = this.tokenService.generateToken({
        userId: newUser.id.value,
        userName: newUser.name!.value,
        email: newUser.email!.value,
        role: newUser.role!,
      });

      this.eventBus.publish(events[0], newUser.id.value);

      return Result.makeOk({
        id: newUser.id.value,
        token,
      });
    } catch (error) {
      return UnexpectedExceptionHandler.handle(error, this.name);
    }
  }
}

export enum RegisterUserServiceFailedExceptionCodes {
  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
  USER_CREATION_FAILED = "USER_CREATION_FAILED",
}

export class RegisterUserServiceFailedException extends BaseException {
  constructor(
    message: string,
    code: RegisterUserServiceFailedExceptionCodes,
    cause?: BaseException
  ) {
    super(message, code, cause);
  }
}
