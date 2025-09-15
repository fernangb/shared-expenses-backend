import { sign, verify } from 'jsonwebtoken';
import { AuthConfig } from 'src/modules/auth/config/auth.config';

export default class TokenService {
  validateToken(token): boolean {
    if (!token) throw new Error('Invalid token');

    const jwt = AuthConfig.getJWT();

    try {
      const decoded = verify(token, jwt.secret);

      if (!decoded) throw new Error('Invalid token');
      return true;
    } catch {
      throw new Error('Invalid token');
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
