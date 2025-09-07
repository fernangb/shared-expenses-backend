import { hash, compare } from 'bcryptjs';
import IHashProvider from '../../../../../modules/auth/domain/providers/hash.provider';

export default class BCryptHashProvider implements IHashProvider {
  createHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
  compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
