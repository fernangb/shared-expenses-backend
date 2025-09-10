import { BadRequestException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import JSONWebTokenProvider from '../json-web-token.provider';
import { AuthConfig } from '../../../../../../modules/auth/config/auth.config';

jest.mock('jsonwebtoken');
jest.mock('../../../../../../modules/auth/config/auth.config');

describe('JSONWebTokenProvider', () => {
  let provider: JSONWebTokenProvider;

  beforeEach(() => {
    provider = new JSONWebTokenProvider();

    (AuthConfig.getJWT as jest.Mock).mockReturnValue({
      secret: 'test-secret',
      expiresIn: '1h',
    });
  });

  describe('createToken', () => {
    it('should call sign and return a token', () => {
      (sign as jest.Mock).mockReturnValue('signed-token');

      const token = provider.createToken('user-1');

      expect(sign).toHaveBeenCalledWith({}, 'test-secret', {
        subject: 'user-1',
        expiresIn: '1h',
      });
      expect(token).toBe('signed-token');
    });
  });

  describe('validateToken', () => {
    it('should return true for a valid token', () => {
      (verify as jest.Mock).mockReturnValue({ sub: 'user-1' });

      const result = provider.validateToken('valid-token');

      expect(verify).toHaveBeenCalledWith('valid-token', 'test-secret');
      expect(result).toBe(true);
    });

    it('should throw BadRequestException if token is empty', () => {
      expect(() => provider.validateToken(null)).toThrow(BadRequestException);
      expect(() => provider.validateToken(undefined)).toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if verify returns falsy', () => {
      (verify as jest.Mock).mockReturnValue(null);

      expect(() => provider.validateToken('invalid-token')).toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if verify throws an error', () => {
      (verify as jest.Mock).mockImplementation(() => {
        throw new Error('verify error');
      });

      expect(() => provider.validateToken('invalid-token')).toThrow(
        BadRequestException,
      );
    });
  });
});
