import { Optional } from "@core/utils";
import { RegisterUser, User } from "../types";

export interface UsersRepository {
  getUserByEmail(email: string): Promise<Optional<User>>;
  getUserById(id: string): Promise<Optional<User>>;
  getUserByUsername(username: string): Promise<Optional<User>>;

  createUser(user: RegisterUser): Promise<Optional<User>>;
}
