import { UserRole } from "@app/auth/domain/value-objects";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
