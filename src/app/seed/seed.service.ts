import { PrismaClient } from "@prisma/client";

export class SeedService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async clearDB() {
    await this.prisma.orderDetail.deleteMany({});
    await this.prisma.order.deleteMany({});
    await this.prisma.product.deleteMany({});
    await this.prisma.user.deleteMany({});
    await this.prisma.domainEvent.deleteMany({});
    await this.prisma.executionPerformance.deleteMany({});
  }
}
