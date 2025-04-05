import { DomainEvent } from "@core/domain/domain-event";

export class UserRegistered extends DomainEvent {
  constructor(
    public aggregateId: string,
    public aggVersion: number,
    public name: string,
    public password: string,
    public email: string,
    public role: string
  ) {
    super(
      aggregateId,
      {
        name: name,
        password: password,
        email: email,
        role,
      },
      aggVersion
    );
  }
}
