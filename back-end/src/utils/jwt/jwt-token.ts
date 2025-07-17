import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

export class JwtUtil {
  static createToken(payload: object, expiresIn: string | number = '24h'): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
  }

  static verifyToken(token: string): any {
    return jwt.verify(token, JWT_SECRET);
  }
}