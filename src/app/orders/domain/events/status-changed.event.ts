import { DomainEvent } from "@core/domain/domain-event";

export class StatusChanged extends DomainEvent {
  constructor(
    public aggregateId: string,
    public aggVersion: number,
    public status: string
  ) {
    super(aggregateId, { status }, aggVersion);
  }
}
