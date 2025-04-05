import { ValueObject } from "@core/domain/value-object";

export class HashedPassword implements ValueObject<HashedPassword> {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value;
  }

  equals(obj: HashedPassword): boolean {
    return this._value === obj.value;
  }

  static create(value: string): HashedPassword {
    return new HashedPassword(value);
  }
}
