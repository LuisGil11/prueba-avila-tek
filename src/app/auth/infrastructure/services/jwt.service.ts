import { TokenPayload, TokenService } from "@app/auth/application/services";
import jwt from "jsonwebtoken";

export class JwtService implements TokenService {
  generateToken(paylaod: TokenPayload): string {
    const token = jwt.sign(paylaod, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    return token;
  }
  validateToken(token: string): boolean {
    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
      return true;
    } catch (error) {
      return false;
    }
  }
  decodeToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      return decoded as TokenPayload;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
