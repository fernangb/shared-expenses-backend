import { Money } from '../money.vo';

describe('Money', () => {
  it('should create a valid money object with integer value', () => {
    const money = new Money(100);
    expect(money.value).toBe(100);
  });

  it('should create a valid money object with decimal value (2 decimal places)', () => {
    const money = new Money(99.99);
    expect(money.value).toBe(99.99);
  });

  it('should create a valid money object with decimal value (1 decimal place)', () => {
    const money = new Money(50.5);
    expect(money.value).toBe(50.5);
  });

  it('should throw an error if more than 2 decimal places are provided', () => {
    expect(() => new Money(10.123)).toThrowError('Invalid money value');
  });

  it('should throw an error if a negative value is provided', () => {
    expect(() => new Money(-5)).toThrowError('Invalid money value');
  });

  it('should throw an error if a non-numeric value is provided (NaN)', () => {
    expect(() => new Money(NaN)).toThrowError('Invalid money value');
  });

  it('should validate large integer values', () => {
    const money = new Money(1000000);
    expect(money.value).toBe(1000000);
  });
});
