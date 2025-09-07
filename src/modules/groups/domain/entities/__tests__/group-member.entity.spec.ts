import { GroupMemberEntity } from '../group-member.entity';
import { GroupEntity } from '../group.entity';

describe('Group Member Entity', () => {
  it('should create an admin entity', () => {
    const id = '845906fe-44f5-4575-ab8d-1f579d0544be';
    const createdAt = new Date();
    const updatedAt = new Date();
    const group = new GroupEntity({
      name: 'Fake Group',
      createdUserId: '845906fe-44f5-4575-ab8d-1f579d0544bd',
    });

    const isAdmin = true;
    const userId = '845906fe-44f5-4575-ab8d-1f579d0544bd';

    const entity = new GroupMemberEntity({
      id,
      group,
      isAdmin: true,
      userId: group.createdUserId,
      createdAt,
      updatedAt,
    });

    expect(entity).toEqual({
      id,
      group,
      isAdmin,
      userId,
      createdAt,
      updatedAt,
    });
  });

  it('should create a non admin entity', () => {
    const id = '845906fe-44f5-4575-ab8d-1f579d0544be';
    const createdAt = new Date();
    const updatedAt = new Date();
    const group = new GroupEntity({
      name: 'Fake Group',
      createdUserId: '845906fe-44f5-4575-ab8d-1f579d0544bd',
    });

    const isAdmin = false;
    const userId = '845906fe-44f5-4575-ab8d-1f579d0544bd';

    const entity = new GroupMemberEntity({
      id,
      group,
      isAdmin: false,
      userId: group.createdUserId,
      createdAt,
      updatedAt,
    });

    expect(entity).toEqual({
      id,
      group,
      isAdmin,
      userId,
      createdAt,
      updatedAt,
    });
  });
});
