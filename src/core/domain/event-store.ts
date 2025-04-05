import { BaseException } from "@core/utils";
import { DomainEvent } from "./domain-event";

export interface EventStore {
  append(stream: string, events: DomainEvent[]): Promise<void>;
  get(stream: string): Promise<DomainEvent[]>;
}

export class CouldntRetrieveEventsException extends BaseException {
  static code = "COULDNT_RETRIEVE_EVENTS_EXCEPTION";

  constructor(message: string) {
    super(message, CouldntRetrieveEventsException.code);
  }
}

export class CouldntAppendEventsException extends BaseException {
  static code = "COULDNT_APPEND_EVENTS_EXCEPTION";

  constructor(message: string) {
    super(message, CouldntAppendEventsException.code);
  }
}
