import { DomainEvent } from "./domain-event";

export interface EventBus {
  publish(event: DomainEvent | DomainEvent[], providerId?: string): void;
  on(
    event: string,
    handle: (event: unknown, providerId?: string) => void
  ): void;
}
