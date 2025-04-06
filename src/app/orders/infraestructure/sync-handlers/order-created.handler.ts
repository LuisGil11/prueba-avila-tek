import { OrderCreated } from "@app/orders/domain/events/order-created.event";
import { PinoLogger } from "@core/infraestructure";
import { EventEmitterBus } from "@core/infraestructure/utils/event-emitter-bus";
import { OrderDetail, PrismaClient } from "@prisma/client";

const eventBus = EventEmitterBus.getInstance();
const prisma = new PrismaClient();
const logger = PinoLogger.getInstance();

const handler = async (event: unknown, prodiverId?: string) => {
  logger.verbose(`Order created event received`);

  const orderCreatedEvent = event as OrderCreated;

  try {
    const order = await prisma.order.create({
      data: {
        id: orderCreatedEvent.aggregateId,
        userId: orderCreatedEvent.userId,
        total: orderCreatedEvent.total.amount,
        currency: orderCreatedEvent.total.currency,
        status: orderCreatedEvent.status,
      },
    });

    const orderItems = orderCreatedEvent.items.map((item) => ({
      orderId: order.id,
      productId: item.id,
      quantity: item.quantity,
      price: item.price.amount,
      currency: item.price.currency,
    }));

    await prisma.orderDetail.createMany({
      data: orderItems,
    });

    logger.verbose(
      `Product created event processed for product: ${orderCreatedEvent.aggregateId}`
    );
  } catch (error) {
    logger.warn(
      `Error processing OrderCreated event for order: ${orderCreatedEvent.aggregateId}: ${error}`
    );
  }
};

eventBus.on(OrderCreated.name, handler);
