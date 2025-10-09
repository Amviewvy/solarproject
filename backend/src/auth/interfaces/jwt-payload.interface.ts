export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
  iat?: number; // issued at
  exp?: number; // expiration
}
