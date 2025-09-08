import { Test, TestingModule } from '@nestjs/testing';
import { FindUserGroupsController } from '../find-user-groups.controller';
import { FindUserGroupsUseCase } from '../../../../application/use-cases/find-user-groups.use-case';
import { UserNotExistsError } from '../../../../../../modules/users/application/errors/user-not-exists.error';

describe('FindUserGroupsController (unit)', () => {
  let controller: FindUserGroupsController;
  let useCase: FindUserGroupsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindUserGroupsController],
      providers: [
        {
          provide: FindUserGroupsUseCase,
          useValue: { handle: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<FindUserGroupsController>(FindUserGroupsController);
    useCase = module.get<FindUserGroupsUseCase>(FindUserGroupsUseCase);
  });

  it('should call useCase.handle with correct userId', async () => {
    const userId = 'user123';
    await controller.execute(userId);
    expect(useCase.handle).toHaveBeenCalledWith({ userId });
  });

  it('should propagate errors from useCase', async () => {
    const userId = 'user123';
    (useCase.handle as jest.Mock).mockRejectedValueOnce(
      new UserNotExistsError(),
    );

    await expect(controller.execute(userId)).rejects.toThrow(
      UserNotExistsError,
    );
  });
});
