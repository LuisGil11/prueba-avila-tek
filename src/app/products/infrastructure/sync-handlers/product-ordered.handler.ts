import { ProductOrdered } from "@app/products/domain/events";
import { PinoLogger } from "@core/infrastructure";
import { EventEmitterBus } from "@core/infrastructure/utils/event-emitter-bus";
import { PrismaClient } from "@prisma/client";

const eventBus = EventEmitterBus.getInstance();
const prisma = new PrismaClient();
const logger = PinoLogger.getInstance();

const handler = async (event: unknown, prodiverId?: string) => {
  logger.verbose(`Product ordered event received`);

  const productOrderedEvent = event as ProductOrdered;

  await prisma.product.update({
    where: { id: productOrderedEvent.aggregateId },
    data: {
      stock: {
        decrement: productOrderedEvent.quantity.quantity,
      },
    },
  });

  logger.verbose(`Product updated event processed ${productOrderedEvent}`);
};

eventBus.on(ProductOrdered.name, handler);
