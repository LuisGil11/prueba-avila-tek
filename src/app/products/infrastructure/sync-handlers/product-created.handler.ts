import { ProductCreated } from "@app/products/domain/events/product-created.event";
import { PinoLogger } from "@core/infrastructure";
import { EventEmitterBus } from "@core/infrastructure/utils/event-emitter-bus";
import { PrismaClient } from "@prisma/client";

const eventBus = EventEmitterBus.getInstance();
const prisma = new PrismaClient();
const logger = PinoLogger.getInstance();

const handler = async (event: unknown, prodiverId?: string) => {
  logger.verbose(`Product created event received`);

  const productRegisteredEvent = event as ProductCreated;

  await prisma.product.create({
    data: {
      id: productRegisteredEvent.aggregateId,
      name: productRegisteredEvent.name,
      description: productRegisteredEvent.description,
      price: productRegisteredEvent.price.amount,
      currency: productRegisteredEvent.price.currency,
      stock: productRegisteredEvent.stock.quantity,
      unit: productRegisteredEvent.stock.unit,
    },
  });

  logger.verbose(
    `Product created event processed for product: ${productRegisteredEvent.aggregateId}`
  );
};

eventBus.on(ProductCreated.name, handler);
