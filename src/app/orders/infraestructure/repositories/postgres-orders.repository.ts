import { OrdersRepository } from "@app/orders/application/repositories/orders.repository";
import { Order } from "@app/orders/application/responses/order.response";
import { OrderStatus } from "@app/orders/domain/value-objects/status";
import { Optional } from "@core/utils";
import { PrismaClient } from "@prisma/client";

export class PostgresOrdersRepository implements OrdersRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllOrders(
    limit: number,
    offset: number,
    status?: OrderStatus,
    userId?: string
  ): Promise<Optional<Order[]>> {
    try {
      const orders = await this.prisma.order.findMany({
        where: {
          userId: userId ? userId : undefined,
          status: status ? status : undefined,
        },
        include: {
          OrderDetail: {
            include: {
              product: true,
            },
          },
        },
        take: limit,
        skip: offset,
      });

      if (!orders) {
        return Optional.empty<Order[]>();
      }

      return Optional.of<Order[]>(
        orders.map((order) => ({
          orderId: order.id,
          status: order.status as OrderStatus,
          items: order.OrderDetail.map((item) => ({
            id: item.productId,
            name: item.product.name,
            quantity: item.quantity,
            priceByUnit: {
              amount: item.product.price,
              currency: item.product.currency,
            },
            totalPrice: {
              amount: item.product.price * item.quantity,
              currency: item.product.currency,
            },
          })),
          totalPrice: {
            amount: order.total,
            currency: order.currency,
          },
        }))
      );
    } catch (error) {
      throw new Error("Error fetching orders from the database");
    }
  }
  async getOrderById(id: string): Promise<Optional<Order>> {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          id,
        },
        include: {
          OrderDetail: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!order) {
        return Optional.empty<Order>();
      }

      return Optional.of<Order>({
        orderId: order.id,
        status: order.status as OrderStatus,
        items: order.OrderDetail.map((item) => ({
          id: item.productId,
          name: item.product.name,
          quantity: item.quantity,
          priceByUnit: {
            amount: item.product.price,
            currency: item.product.currency,
          },
          totalPrice: {
            amount: item.product.price * item.quantity,
            currency: item.product.currency,
          },
        })),
        totalPrice: {
          amount: order.total,
          currency: order.currency,
        },
      });
    } catch (error) {
      throw new Error("Error fetching order from the database");
    }
  }
}
