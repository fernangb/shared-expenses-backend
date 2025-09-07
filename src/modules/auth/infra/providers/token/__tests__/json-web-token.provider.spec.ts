import { BadRequestException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import JSONWebTokenProvider from '../json-web-token.provider';
import { AuthConfig } from '../../../../../../modules/auth/config/auth.config';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

jest.mock('../../../../../../modules/auth/config/auth.config', () => ({
  AuthConfig: {
    getJWT: jest.fn(),
  },
}));

describe('JSONWebTokenProvider', () => {
  let provider: JSONWebTokenProvider;

  beforeEach(() => {
    provider = new JSONWebTokenProvider();
    jest.clearAllMocks();
  });

  describe('createToken', () => {
    it('should create a token with correct parameters', () => {
      (AuthConfig.getJWT as jest.Mock).mockReturnValue({
        secret: 'test-secret',
        expiresIn: '1h',
      });
      (sign as jest.Mock).mockReturnValue('signed-token');

      const token = provider.createToken('user-123');

      expect(AuthConfig.getJWT).toHaveBeenCalled();
      expect(sign).toHaveBeenCalledWith({}, 'test-secret', {
        subject: 'user-123',
        expiresIn: '1h',
      });
      expect(token).toBe('signed-token');
    });
  });

  describe('validateToken', () => {
    it('should return true if token is valid', () => {
      (AuthConfig.getJWT as jest.Mock).mockReturnValue({
        secret: 'test-secret',
      });
      (verify as jest.Mock).mockReturnValue({ sub: 'user-123' });

      const result = provider.validateToken('valid-token');

      expect(AuthConfig.getJWT).toHaveBeenCalled();
      expect(verify).toHaveBeenCalledWith('valid-token', 'test-secret');
      expect(result).toBe(true);
    });

    it('should throw BadRequestException if token is missing', () => {
      expect(() => provider.validateToken(null)).toThrow(BadRequestException);
    });

    it('should throw BadRequestException if token is invalid', () => {
      (AuthConfig.getJWT as jest.Mock).mockReturnValue({
        secret: 'test-secret',
      });
      (verify as jest.Mock).mockImplementation(() => {
        throw new Error('invalid token');
      });

      expect(() => provider.validateToken('invalid-token')).toThrow(
        BadRequestException,
      );
    });
  });
});
