import { AggregateRoot } from "@core/domain/aggregate-root";
import {
  UserId,
  UserMail,
  UserName,
  HashedPassword,
  UserRole,
} from "./value-objects";
import { UserRegistered } from "./events/user-registered";
import { BaseException } from "@core/utils";
import { DomainEvent } from "@core/domain/domain-event";

export class User extends AggregateRoot<UserId> {
  _name?: UserName;
  _password?: HashedPassword;
  _email?: UserMail;
  _role?: UserRole;

  private constructor(id: UserId) {
    super(id);
  }

  static create(
    id: UserId,
    name: UserName,
    password: HashedPassword,
    email: UserMail,
    role: UserRole
  ): User {
    const user = new User(id);
    user.apply(
      new UserRegistered(
        id.value,
        user.version,
        name.value,
        password.value,
        email.value,
        role
      )
    );
    return user;
  }

  get name(): UserName | undefined {
    return this._name;
  }

  get password(): HashedPassword | undefined {
    return this._password;
  }

  get email(): UserMail | undefined {
    return this._email;
  }

  get role(): UserRole | undefined {
    return this._role;
  }

  [`on${UserRegistered.name}`](context: UserRegistered): void {
    this._name = UserName.create(context.name);
    this._password = HashedPassword.create(context.password);
    this._email = UserMail.create(context.email);
    this._role = UserRole[context.role as keyof typeof UserRole];
  }

  protected validateState(): void {
    if (!this._name || !this._password || !this._email || !this._role)
      throw new InvalidUserStateException("User state is invalid");
  }

  static laodFromHistory(id: UserId, events: DomainEvent[]): User {
    const user = new User(id);
    user.rehydrate(events);
    user.validateState();

    return user;
  }
}

export class InvalidUserStateException extends BaseException {
  static code = "INVALID_USER_STATE";

  constructor(message: string) {
    super(message, InvalidUserStateException.code);
  }
}
