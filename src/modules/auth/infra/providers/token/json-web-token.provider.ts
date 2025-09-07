import { BadRequestException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { AuthConfig } from 'src/modules/auth/config/auth.config';
import ITokenProvider from 'src/modules/auth/domain/providers/token.provider';

export default class JSONWebTokenProvider implements ITokenProvider {
  validateToken(token): boolean {
    if (!token) throw new BadRequestException('Invalid token');

    const jwt = AuthConfig.getJWT();

    const decoded = verify(token, jwt.secret);

    if (!decoded) throw new BadRequestException('Invalid token');
    return true;
  }

  createToken(userId: string): string {
    const { secret, expiresIn } = AuthConfig.getJWT();

    return sign({}, secret, {
      subject: userId,
      expiresIn,
    });
  }
}
