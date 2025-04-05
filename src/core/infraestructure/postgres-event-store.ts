import { ILogger } from "@core/application";
import { DomainEvent } from "@core/domain/domain-event";
import {
  CouldntRetrieveEventsException,
  EventStore,
} from "@core/domain/event-store";
import { PrismaClient } from "@prisma/client";
import { PinoLogger } from "./pino-logger";

export class PostgresEventStore implements EventStore {
  private readonly prisma: PrismaClient;
  private readonly logger: ILogger;

  constructor() {
    this.prisma = new PrismaClient();
    this.logger = PinoLogger.getInstance();
  }

  async append(stream: string, events: DomainEvent[]): Promise<void> {
    try {
      await this.prisma.domainEvent.createMany({
        data: events.map((event) => ({
          aggregateId: stream,
          eventType: event.eventName,
          payload: event.context,
        })),
      });
    } catch (error) {
      this.logger.error(
        "Error appending events to stream",
        JSON.stringify(error)
      );
    }
  }

  async get(stream: string): Promise<DomainEvent[]> {
    try {
      const events = await this.prisma.domainEvent.findMany({
        where: {
          aggregateId: stream,
        },
      });

      return events.map((event) => {
        const payload =
          typeof event.payload === "string"
            ? JSON.parse(event.payload)
            : event.payload;

        return new DomainEvent(event.aggregateId, payload, event.eventType);
      });
    } catch (error) {
      this.logger.error(
        "Error getting events from stream",
        JSON.stringify(error)
      );

      throw new CouldntRetrieveEventsException(
        "Error getting events from store for stream " + stream
      );
    }
  }
}
