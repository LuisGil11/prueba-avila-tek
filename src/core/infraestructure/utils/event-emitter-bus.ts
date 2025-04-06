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

  publish(event: DomainEvent | DomainEvent[], providerId?: string): void {
    if (Array.isArray(event)) {
      event.forEach((e) => {
        this.eventEmitter.emit(e.eventName, e, providerId);
      });
      return;
    }

    this.eventEmitter.emit(event.eventName, event, providerId);
  }

  static getInstance(): EventEmitterBus {
    if (!EventEmitterBus.instance) {
      EventEmitterBus.instance = new EventEmitterBus();
    }
    return EventEmitterBus.instance;
  }
}
