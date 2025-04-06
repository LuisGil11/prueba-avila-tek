import { PasswordEncripterService } from "../../application/services/password-encripter.service";
import { hash, compare } from "bcrypt";

export class BCryptPasswordEncripterService
  implements PasswordEncripterService
{
  async encryptPassword(password: string): Promise<string> {
    const salt = 10;
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  }
  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}
