import { Product } from "@app/products/types/product";
import { Optional } from "@core/utils";
import { ProductsRepository } from "../../application/repositories/product.repository";
import { PrismaClient } from "@prisma/client";
import { PinoLogger } from "@core/infrastructure";
export class PostgresProductsRepository implements ProductsRepository {
  private readonly prisma: PrismaClient;
  private readonly logger: PinoLogger;

  constructor() {
    this.prisma = new PrismaClient();
    this.logger = PinoLogger.getInstance();
  }

  async findByIds(ids: string[]): Promise<Optional<Product[]>> {
    try {
      const products = await this.prisma.product.findMany({
        where: {
          id: { in: ids },
        },
      });

      if (!products) return Optional.empty<Product[]>();
      return Optional.of<Product[]>(
        products.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: {
            amount: product.price,
            currency: product.currency,
          },
          stock: {
            quantity: product.stock,
            unit: product.unit,
          },
        }))
      );
    } catch (error) {
      this.logger.warn(
        `An unexpected error occurred while retrieving products with ids ${ids}: ${error}`
      );
      return Optional.empty<Product[]>();
    }
  }

  async delete(id: string): Promise<Optional<Product>> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id, isDeleted: false },
      });

      if (!product) return Optional.empty<Product>();

      await this.prisma.product.update({
        where: { id },
        data: { isDeleted: true },
      });

      return Optional.of<Product>({
        id: product.id,
        name: product.name,
        description: product.description,
        price: {
          amount: product.price,
          currency: product.currency,
        },
        stock: {
          quantity: product.stock,
          unit: product.unit,
        },
      });
    } catch (error) {
      this.logger.warn(
        `An unexpected error occurred while deleting product with id ${id}: ${error}`
      );
      return Optional.empty<Product>();
    }
  }
  async getAll(limit: number, offset: number): Promise<Optional<Product[]>> {
    try {
      const products = await this.prisma.product.findMany({
        where: { isDeleted: false },
        take: limit,
        skip: offset,
      });

      const mappedProducts: Product[] = products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: {
          amount: product.price,
          currency: product.currency,
        },
        stock: {
          quantity: product.stock,
          unit: product.unit,
        },
      }));

      return Optional.of<Product[]>(mappedProducts);
    } catch (error) {
      this.logger.warn(
        `An unexpected error occurred while retrieving products: ${error}`
      );
      return Optional.empty<Product[]>();
    }
  }

  async findById(id: string): Promise<Optional<Product>> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id, isDeleted: false },
      });

      if (!product) return Optional.empty<Product>();

      return Optional.of<Product>({
        id: product.id,
        name: product.name,
        description: product.description,
        price: {
          amount: product.price,
          currency: product.currency,
        },
        stock: {
          quantity: product.stock,
          unit: product.unit,
        },
      });
    } catch (error) {
      this.logger.warn(
        `An unexpected error occurred while retrieving product with id ${id}: ${error}`
      );
      return Optional.empty<Product>();
    }
  }
}
