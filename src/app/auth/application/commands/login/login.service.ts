import { Service } from "@core/application";
import { LoginDto } from "./login.dto";
import { AuthorizedResponse } from "../response/authorized.response";
import { Result, BaseException } from "@core/utils";
import { UsersRepository } from "../../repository";
import { PasswordEncripterService, TokenService } from "../../services";
import { UnexpectedExceptionHandler } from "@core/infraestructure/exceptions/unexpected-error.exception";

export class LoginService implements Service<LoginDto, AuthorizedResponse> {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordEncripter: PasswordEncripterService,
    private readonly tokenService: TokenService
  ) {}

  name: string = this.constructor.name;

  async execute(
    request: LoginDto
  ): Promise<Result<AuthorizedResponse, BaseException>> {
    const { email, password } = request;

    try {
      const userResult = await this.usersRepository.getUserByEmail(email);

      if (!userResult.hasValue) {
        return Result.makeFail(
          new LoginServiceFailedException("Invalid email or password")
        );
      }

      const user = userResult.unwrap();

      const passportMatch = await this.passwordEncripter.comparePasswords(
        password,
        user.password
      );

      if (!passportMatch) {
        return Result.makeFail(
          new LoginServiceFailedException("Invalid email or password")
        );
      }

      const token = this.tokenService.generateToken({
        userId: user.id,
        userName: user.name,
        email: user.email,
        role: user.role,
      });

      return Result.makeOk({
        token,
        id: user.id,
      });
    } catch (error) {
      return UnexpectedExceptionHandler.handle(error, this.name);
    }
  }
}

export class LoginServiceFailedException extends BaseException {
  static code = "LOGIN_SERVICE_FAILED_EXCEPTION";

  constructor(message: string, cause?: BaseException) {
    super(message, LoginServiceFailedException.code, cause);
  }
}
