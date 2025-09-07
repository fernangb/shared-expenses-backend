import { UserEntity } from '../../../../../modules/users/domain/entities/user.entity';
import { UserAuthEntity } from '../user-auth.entity';

describe('User Auth Entity', () => {
  it('should create an entity', () => {
    const createdAt = new Date();
    const updatedAt = new Date();

    const user = new UserEntity({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
      phone: '21999999999',
    });

    const id = '845906fe-44f5-4575-ab8d-1f579d0544be';
    const password = '123';

    const entity = new UserAuthEntity({
      id,
      user,
      password,
      createdAt,
      updatedAt,
    });

    expect(entity).toEqual({
      id,
      user,
      password,
      createdAt,
      updatedAt,
    });
  });
});
