import { ValueObject } from "@core/domain/value-object";
import { BaseException } from "@core/utils";

export class UserName implements ValueObject<UserName> {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value;
  }

  equals(obj: UserName): boolean {
    return this._value === obj.value;
  }

  static create(value: string): UserName {
    if (!isValidUserName(value)) {
      throw new UserNameCreationFailedException(`Invalid username: ${value}`);
    }
    return new UserName(value);
  }
}

function isValidUserName(name: string): boolean {
  const userNameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return userNameRegex.test(name);
}

export class UserNameCreationFailedException extends BaseException {
  static code = "USER_NAME_CREATION_FAILED";

  constructor(message: string) {
    super(message, UserNameCreationFailedException.code);
  }
}
