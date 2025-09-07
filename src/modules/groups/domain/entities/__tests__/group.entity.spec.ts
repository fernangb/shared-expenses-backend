import { GroupEntity } from '../group.entity';

describe('Group Entity', () => {
  it('should create an entity', () => {
    const id = '845906fe-44f5-4575-ab8d-1f579d0544be';
    const createdAt = new Date();
    const updatedAt = new Date();
    const name = 'Fake group';
    const createdUserId = '845906fe-44f5-4575-ab8d-1f579d0544bd';

    const entity = new GroupEntity({
      id,
      name,
      createdUserId,
      createdAt,
      updatedAt,
    });

    expect(entity).toEqual({
      id,
      name,
      createdUserId,
      createdAt,
      updatedAt,
    });
  });
});
