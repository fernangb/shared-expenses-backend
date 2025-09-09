import { GroupService } from '../group.service';
import { IGroupRepository } from '../../../domain/repositories/group.repository';
import { GroupEntity } from '../../../domain/entities/group.entity';

describe('GroupService', () => {
  let service: GroupService;
  let repository: jest.Mocked<IGroupRepository>;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<IGroupRepository>;

    service = new GroupService(repository);
  });

  it('should find group by id', async () => {
    const group: GroupEntity = {
      id: '123',
      name: 'Grupo Teste',
    } as GroupEntity;
    repository.findById.mockResolvedValue(group);

    const result = await service.findById('123');

    expect(repository.findById).toHaveBeenCalledWith('123');
    expect(result).toEqual(group);
  });

  it('should return null if not find group', async () => {
    repository.findById.mockResolvedValue(null);

    const result = await service.findById('999');

    expect(repository.findById).toHaveBeenCalledWith('999');
    expect(result).toBeNull();
  });

  it('should return error', async () => {
    repository.findById.mockRejectedValue(new Error('DB error'));

    await expect(service.findById('123')).rejects.toThrow('DB error');
  });
});
