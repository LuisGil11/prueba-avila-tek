import { ValueObject } from "@core/domain/value-object";
import { BaseException } from "@core/utils";

export class UserPassword implements ValueObject<UserPassword> {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value;
  }

  equals(obj: UserPassword): boolean {
    return this._value === obj.value;
  }

  static create(value: string): UserPassword {
    if (!isValidPassword(value)) {
      throw new UserPasswordCreationFailedException(
        `Invalid password: ${value}. Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.`
      );
    }
    return new UserPassword(value);
  }
}

function isValidPassword(password: string): boolean {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{6,}$/;
  return passwordRegex.test(password);
}
export class UserPasswordCreationFailedException extends BaseException {
  static code = "USER_PASSWORD_CREATION_FAILED";

  constructor(message: string) {
    super(message, UserPasswordCreationFailedException.code);
    this.name = UserPasswordCreationFailedException.code;
  }
}
