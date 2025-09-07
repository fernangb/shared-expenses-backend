import { BadRequestException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { AuthConfig } from '../../../../../modules/auth/config/auth.config';
import ITokenProvider from '../../../../../modules/auth/domain/providers/token.provider';

export default class JSONWebTokenProvider implements ITokenProvider {
  validateToken(token): boolean {
    if (!token) throw new BadRequestException('Invalid token');

    const jwt = AuthConfig.getJWT();

    try {
      const decoded = verify(token, jwt.secret);

      if (!decoded) throw new BadRequestException('Invalid token');
      return true;
    } catch {
      throw new BadRequestException('Invalid token');
    }
  }

  createToken(userId: string): string {
    const { secret, expiresIn } = AuthConfig.getJWT();

    return sign({}, secret, {
      subject: userId,
      expiresIn,
    });
  }
}
