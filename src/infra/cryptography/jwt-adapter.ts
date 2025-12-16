import jwt from 'jsonwebtoken';
import { ITokenGenerator } from '@/application/services/token-generator.interface';

export class JwtAdapter implements ITokenGenerator {
  constructor(private readonly secret: string) {}

  generate(userId: string): string {
    return jwt.sign({ sub: userId }, this.secret, { expiresIn: '1d' });
  }
}