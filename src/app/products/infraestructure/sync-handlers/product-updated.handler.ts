import { ProductUpdated } from "@app/products/domain/events/product-updated.event";
import { PinoLogger } from "@core/infraestructure";
import { EventEmitterBus } from "@core/infraestructure/event-emitter-bus";
import { PrismaClient } from "@prisma/client";

const eventBus = EventEmitterBus.getInstance();
const prisma = new PrismaClient();
const logger = PinoLogger.getInstance();

const handler = async (event: unknown, prodiverId?: string) => {
  logger.verbose(`Product updated event received`);

  const productUpdatedEvent = event as ProductUpdated;

  await prisma.product.update({
    where: { id: productUpdatedEvent.aggregateId },
    data: {
      name: productUpdatedEvent.name,
      description: productUpdatedEvent.description,
      price: productUpdatedEvent.price?.amount,
      currency: productUpdatedEvent.price?.currency,
      stock: productUpdatedEvent.stock?.quantity,
      unit: productUpdatedEvent.stock?.unit,
    },
  });

  logger.verbose(`Product updated event processed ${productUpdatedEvent}`);
};

eventBus.on(ProductUpdated.name, handler);
