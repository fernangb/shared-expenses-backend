import { UserEntity } from '../user.entity';

describe('User Entity', () => {
  it('should create an entity', () => {
    const createdAt = new Date();
    const updatedAt = new Date();

    const id = '845906fe-44f5-4575-ab8d-1f579d0544be';
    const firstName = 'John';
    const lastName = 'Dow';
    const email = 'johndoe@email.com';
    const phone = '21999999999';

    const entity = new UserEntity({
      id,
      firstName,
      lastName,
      email,
      phone,
      createdAt,
      updatedAt,
    });

    expect(entity).toEqual({
      id,
      firstName,
      lastName,
      email,
      phone,
      createdAt,
      updatedAt,
    });
  });
});
