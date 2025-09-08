import { Test, TestingModule } from '@nestjs/testing';
import { AddGroupMemberController } from '../add-group-member.controller';
import { AddGroupMemberUseCase } from '../../../../../../modules/groups/application/use-cases/add-group-member.use-case';
import { AddGroupMemberInputDTO } from '../../dtos/add-group-member.dto';
import { OnlyAdminCanAddUserError } from '../../../../../../modules/groups/application/errors/only-admin-can-add-user.error';

describe('AddGroupMemberController', () => {
  let controller: AddGroupMemberController;
  let useCase: AddGroupMemberUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddGroupMemberController],
      providers: [
        {
          provide: AddGroupMemberUseCase,
          useValue: {
            handle: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AddGroupMemberController>(AddGroupMemberController);
    useCase = module.get<AddGroupMemberUseCase>(AddGroupMemberUseCase);
  });

  it('should call useCase.handle with correct DTO', async () => {
    const dto: AddGroupMemberInputDTO = {
      groupId: 'group1',
      adminId: 'admin1',
      memberEmail: 'user@test.com',
    };
    await controller.create(dto);

    expect(useCase.handle).toHaveBeenCalledWith(dto);
  });

  it('should propagate errors from useCase', async () => {
    const dto: AddGroupMemberInputDTO = {
      groupId: 'group1',
      adminId: 'admin1',
      memberEmail: 'user@test.com',
    };
    (useCase.handle as jest.Mock).mockRejectedValueOnce(
      new OnlyAdminCanAddUserError(),
    );

    await expect(controller.create(dto)).rejects.toThrow(
      OnlyAdminCanAddUserError,
    );
  });
});
