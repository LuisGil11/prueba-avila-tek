import { PrismaClient } from "@prisma/client";
import { UsersRepository } from "../../application/repository/users.repository";
import { Optional } from "@core/utils";
import { User } from "../../application/types/user";
import { RegisterUser } from "../../application/types/register-user";
import { UserRole } from "@app/auth/domain/value-objects";

export class PostgresUserRepository implements UsersRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUserById(id: string): Promise<Optional<User>> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return Optional.empty<User>();
    }
    return Optional.of<User>({
      ...user,
      role: UserRole[user.role as keyof typeof UserRole],
    });
  }
  async getUserByUsername(username: string): Promise<Optional<User>> {
    const user = await this.prisma.user.findUnique({
      where: {
        name: username,
      },
    });

    if (!user) {
      return Optional.empty<User>();
    }
    return Optional.of<User>({
      ...user,
      role: user.role === "ADMIN" ? UserRole.ADMIN : UserRole.USER,
    });
  }

  async getUserByEmail(email: string): Promise<Optional<User>> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return Optional.empty<User>();
    }
    return Optional.of<User>({
      ...user,
      role: user.role === "ADMIN" ? UserRole.ADMIN : UserRole.USER,
    });
  }

  async createUser(user: RegisterUser): Promise<Optional<User>> {
    const createdUser = await this.prisma.user.create({
      data: {
        ...user,
      },
    });

    return Optional.of<User>({
      ...createdUser,
      role: createdUser.role === "ADMIN" ? UserRole.ADMIN : UserRole.USER,
    });
  }
}
