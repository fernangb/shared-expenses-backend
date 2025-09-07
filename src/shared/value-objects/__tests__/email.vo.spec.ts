import { Email } from '../email.vo';

describe('Email Value Object', () => {
  it('should throw error if email is invalid', () => {
    const value = 'invalid.email';

    expect(() => {
      new Email(value);
    }).toThrowError('Invalid email');
  });

  it('should create a valid email', () => {
    const value = 'example@email.com';

    expect(new Email(value).value).toEqual(value);
  });
});
