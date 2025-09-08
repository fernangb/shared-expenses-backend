import { Test, TestingModule } from '@nestjs/testing';
import { FindGroupMembersController } from '../find-group-members.controller';
import { FindGroupMembersUseCase } from '../../../../application/use-cases/find-group-members.use-case';
import { UserNotExistsError } from '../../../../../../modules/users/application/errors/user-not-exists.error';

describe('FindGroupMembersController (unit)', () => {
  let controller: FindGroupMembersController;
  let useCase: FindGroupMembersUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindGroupMembersController],
      providers: [
        {
          provide: FindGroupMembersUseCase,
          useValue: { handle: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<FindGroupMembersController>(
      FindGroupMembersController,
    );
    useCase = module.get<FindGroupMembersUseCase>(FindGroupMembersUseCase);
  });

  it('should call useCase.handle with correct parameters', async () => {
    const groupId = 'group1';
    const userId = 'user1';

    await controller.execute(groupId, userId);

    expect(useCase.handle).toHaveBeenCalledWith({ groupId, userId });
  });

  it('should propagate errors from useCase', async () => {
    const groupId = 'group1';
    const userId = 'user1';
    (useCase.handle as jest.Mock).mockRejectedValueOnce(
      new UserNotExistsError(),
    );

    await expect(controller.execute(groupId, userId)).rejects.toThrow(
      UserNotExistsError,
    );
  });
});
