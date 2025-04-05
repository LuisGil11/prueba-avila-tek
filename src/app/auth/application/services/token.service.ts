export interface TokenPayload {
  userId: string;
  userName: string;
  email: string;
  role: string;
}

export interface TokenService {
  generateToken(user: TokenPayload): string;
  validateToken(token: string): boolean;
  decodeToken(token: string): TokenPayload;
}
