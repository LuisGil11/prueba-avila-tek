import { StatusChanged } from "@app/orders/domain/events/status-changed.event";
import { PinoLogger } from "@core/infraestructure";
import { EventEmitterBus } from "@core/infraestructure/utils/event-emitter-bus";
import { PrismaClient } from "@prisma/client";

const eventBus = EventEmitterBus.getInstance();
const prisma = new PrismaClient();
const logger = PinoLogger.getInstance();

const handler = async (event: unknown, prodiverId?: string) => {
  logger.verbose(`Order created event received`);

  const statusChangedEvent = event as StatusChanged;

  try {
    const order = await prisma.order.update({
      where: {
        id: statusChangedEvent.aggregateId,
      },
      data: {
        status: statusChangedEvent.status,
      },
    });

    logger.verbose(
      `Order status changed event processed for product: ${statusChangedEvent.aggregateId}`
    );
  } catch (error) {
    logger.warn(
      `Error processing status changed event for order: ${statusChangedEvent.aggregateId}: ${error}`
    );
  }
};

eventBus.on(StatusChanged.name, handler);
