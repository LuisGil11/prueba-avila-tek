import { UserRole } from "@app/auth/domain/value-objects";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
