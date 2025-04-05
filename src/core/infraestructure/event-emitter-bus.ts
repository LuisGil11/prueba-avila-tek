import { DomainEvent } from "@core/domain/domain-event";
import { EventBus } from "@core/domain/event-bus";
import EventEmitter from "events";

export class EventEmitterBus implements EventBus {
  private static instance: EventEmitterBus;
  private eventEmitter: EventEmitter = new EventEmitter();

  private constructor() {}

  on(
    event: string,
    handle: (event: unknown, providerId?: string) => void
  ): void {
    this.eventEmitter.on(event, handle);
  }

  publish(event: unknown, providerId?: string): void {
    this.eventEmitter.emit((event as DomainEvent).eventName, event, providerId);
  }

  static getInstance(): EventEmitterBus {
    if (!EventEmitterBus.instance) {
      EventEmitterBus.instance = new EventEmitterBus();
    }
    return EventEmitterBus.instance;
  }
}
