import { BaseErrorOutput } from '../base.error';

describe('BaseErrorOutput', () => {
  it('should create an instance with statusCode and message', () => {
    const errorProps = { statusCode: 400, message: 'Some error happened' };
    const error = new BaseErrorOutput(errorProps);

    expect(error).toBeInstanceOf(BaseErrorOutput);
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Some error happened');
  });

  it('should match the given properties', () => {
    const errorProps = { statusCode: 404, message: 'Not Found' };
    const error = new BaseErrorOutput(errorProps);

    expect(error).toEqual({
      statusCode: 404,
      message: 'Not Found',
    });
  });
});
