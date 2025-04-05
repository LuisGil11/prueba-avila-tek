import { ValueObject } from "@core/domain/value-object";
import { BaseException } from "@core/utils";
import { UUIDRegex } from "@core/utils/uuid.regex";

export class UserId implements ValueObject<UserId> {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value;
  }

  equals(obj: UserId): boolean {
    return this._value === obj.value;
  }

  static create(value: string): UserId {
    if (!value.match(UUIDRegex)) {
      throw new UserIdCreationFailedException(`Invalid id: ${value}`);
    }
    return new UserId(value);
  }
}

export class UserIdCreationFailedException extends BaseException {
  static code = "USER_ID_CREATION_FAILED";

  constructor(message: string) {
    super(message, UserIdCreationFailedException.code);
  }
}
