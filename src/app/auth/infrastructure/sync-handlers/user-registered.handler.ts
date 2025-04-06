import { UserRegistered } from "@app/auth/domain/events/user-registered";
import { PinoLogger } from "@core/infrastructure";
import { EventEmitterBus } from "@core/infrastructure/utils/event-emitter-bus";
import { PrismaClient, UserRole as PrismaUserRole } from "@prisma/client";

const eventBus = EventEmitterBus.getInstance();
const prisma = new PrismaClient();
const logger = PinoLogger.getInstance();

const handler = async (event: unknown, prodiverId?: string) => {
  logger.verbose(`User registered event received`);

  const userRegisteredEvent = event as UserRegistered;

  await prisma.user.create({
    data: {
      id: userRegisteredEvent.aggregateId,
      name: userRegisteredEvent.name,
      email: userRegisteredEvent.email,
      password: userRegisteredEvent.password,
      role: userRegisteredEvent.role.toUpperCase() as unknown as keyof typeof PrismaUserRole,
    },
  });

  logger.verbose(
    `User registered event processed for user: ${userRegisteredEvent.aggregateId}`
  );
};

eventBus.on(UserRegistered.name, handler);
