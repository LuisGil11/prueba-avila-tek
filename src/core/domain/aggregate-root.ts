import { DomainEvent } from "./domain-event";
import { Entity } from "./entity";
import { ValueObject } from "./value-object";

export abstract class AggregateRoot<
  T extends ValueObject<T>
> extends Entity<T> {
  protected _events: DomainEvent[] = [];
  protected _version = 0;

  protected constructor(id: T) {
    super(id);
  }

  get version(): number {
    return this._version;
  }

  pullEvents(): DomainEvent[] {
    const events = this._events;
    this._events = [];
    return events;
  }

  protected async apply(
    event: DomainEvent,
    fromHistory = false
  ): Promise<void> {
    const handler = this.getEventHandler(event);
    if (!handler)
      throw new Error(`No handler found for event: ${event.eventName}`);
    if (!fromHistory) this._events.push(event);
    await Promise.resolve(handler.call(this, event.context));
    this._version++;
    this.validateState();
  }

  protected getEventHandler(
    event: DomainEvent
  ): ((context: unknown) => void) | undefined {
    const handler = `on${event.eventName}`;
    const eventHandler = (this as Record<string, unknown>)[handler];
    if (typeof eventHandler === "function") {
      return eventHandler as (context: unknown) => void;
    }
    return undefined;
  }

  protected rehydrate(history: DomainEvent[]): void {
    if (history.length === 0) throw new Error("No events to replay");
    history.forEach((event) => this.apply(event, true));
  }

  protected abstract validateState(): void;
}
