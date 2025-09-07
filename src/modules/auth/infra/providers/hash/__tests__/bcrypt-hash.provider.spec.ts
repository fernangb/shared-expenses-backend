import { hash, compare } from 'bcryptjs';
import BCryptHashProvider from '../bcrypt-hash.provider';

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('BCryptHashProvider', () => {
  let provider: BCryptHashProvider;

  beforeEach(() => {
    provider = new BCryptHashProvider();
    jest.clearAllMocks();
  });

  describe('createHash', () => {
    it('should generate a hash from the given payload', async () => {
      (hash as jest.Mock).mockResolvedValue('hashed-password');

      const result = await provider.createHash('plain-password');

      expect(hash).toHaveBeenCalledWith('plain-password', 8);
      expect(result).toBe('hashed-password');
    });
  });

  describe('compareHash', () => {
    it('should return true when passwords match', async () => {
      (compare as jest.Mock).mockResolvedValue(true);

      const result = await provider.compareHash(
        'plain-password',
        'hashed-password',
      );

      expect(compare).toHaveBeenCalledWith('plain-password', 'hashed-password');
      expect(result).toBe(true);
    });

    it('should return false when passwords do not match', async () => {
      (compare as jest.Mock).mockResolvedValue(false);

      const result = await provider.compareHash('plain-password', 'wrong-hash');

      expect(compare).toHaveBeenCalledWith('plain-password', 'wrong-hash');
      expect(result).toBe(false);
    });
  });
});
