import { UUID } from '../uuid.vo';

describe('UUID Value Object', () => {
  it('should throw error if uuid is invalid', () => {
    const value = '123';

    expect(() => {
      new UUID(value);
    }).toThrowError('Invalid UUID');
  });

  it('should create a valid uuid if value is undefined', () => {
    expect(new UUID(undefined).value).toBeDefined();
  });

  it('should create a valid uuid', () => {
    const uuid = '845906fe-44f5-4575-ab8d-1f579d0544be';

    expect(new UUID(uuid).value).toEqual(uuid);
  });
});
