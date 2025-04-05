import { ValueObject } from "@core/domain/value-object";
import { BaseException } from "@core/utils";

export class UserMail implements ValueObject<UserMail> {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value;
  }

  equals(obj: UserMail): boolean {
    return this._value === obj.value;
  }

  static create(value: string): UserMail {
    if (!isValidEmail(value)) {
      throw new UserMailCreationFailedException(`Invalid email: ${value}`);
    }
    return new UserMail(value);
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export class UserMailCreationFailedException extends BaseException {
  static code = "USER_MAIL_CREATION_FAILED";

  constructor(message: string) {
    super(message, UserMailCreationFailedException.code);
  }
}
