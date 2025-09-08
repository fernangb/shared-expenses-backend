import { AuthConfig } from '../auth.config';

describe('AuthConfig', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should return JWT configs when environment variables are set', () => {
    process.env.AUTH_SECRET = 'supersecret';
    process.env.AUTH_EXPIRES_IN = '1h';

    const config = AuthConfig.getJWT();

    expect(config).toEqual({
      secret: 'supersecret',
      expiresIn: '1h',
    });
  });

  it('should return undefined values when environment variables are not set', () => {
    delete process.env.AUTH_SECRET;
    delete process.env.AUTH_EXPIRES_IN;

    const config = AuthConfig.getJWT();

    expect(config).toEqual({
      secret: undefined,
      expiresIn: undefined,
    });
  });
});
