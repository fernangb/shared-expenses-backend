import { Test, TestingModule } from '@nestjs/testing';
import { CreateGroupController } from '../create-group.controller';
import { CreateGroupUseCase } from '../../../../application/use-cases/create-group.use-case';
import { CreateGroupInputDTO } from '../../dtos/create-group.dto';
import { UserNotExistsError } from '../../../../../../modules/users/application/errors/user-not-exists.error';

describe('CreateGroupController (unit)', () => {
  let controller: CreateGroupController;
  let useCase: CreateGroupUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateGroupController],
      providers: [
        {
          provide: CreateGroupUseCase,
          useValue: { handle: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<CreateGroupController>(CreateGroupController);
    useCase = module.get<CreateGroupUseCase>(CreateGroupUseCase);
  });

  it('should call useCase.handle with correct DTO', async () => {
    const dto: CreateGroupInputDTO = { userId: 'user1', name: 'Group 1' };

    await controller.create(dto);

    expect(useCase.handle).toHaveBeenCalledWith(dto);
  });

  it('should propagate errors from useCase', async () => {
    const dto: CreateGroupInputDTO = { userId: 'user1', name: 'Group 1' };
    (useCase.handle as jest.Mock).mockRejectedValueOnce(
      new UserNotExistsError(),
    );

    await expect(controller.create(dto)).rejects.toThrow(UserNotExistsError);
  });
});
