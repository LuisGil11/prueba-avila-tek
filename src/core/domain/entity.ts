import { ValueObject } from "./value-object";

export class Entity<T extends ValueObject<T>> {
  constructor(private readonly _id: T) {}

  get id() {
    return this._id;
  }

  equals(id: T): boolean {
    return this._id.equals(id);
  }
}
