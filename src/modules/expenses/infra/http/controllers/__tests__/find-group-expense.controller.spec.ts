import { Test, TestingModule } from '@nestjs/testing';
import { FindGroupExpenseController } from '../find-group-expense.controller';
import { FindGroupExpenseUseCase } from '../../../../../../modules/expenses/application/use-cases/find-group-expense.use-case';

describe('FindGroupExpenseController (unit)', () => {
  let controller: FindGroupExpenseController;
  let useCase: FindGroupExpenseUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindGroupExpenseController],
      providers: [
        {
          provide: FindGroupExpenseUseCase,
          useValue: { handle: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<FindGroupExpenseController>(
      FindGroupExpenseController,
    );
    useCase = module.get<FindGroupExpenseUseCase>(FindGroupExpenseUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('execute should call useCase.handle with correct parameters', async () => {
    const userId = 'user-1';
    const groupId = 'group-1';
    const expectedResult = [{ id: 'expense-1', value: 100 }];

    (useCase.handle as jest.Mock).mockResolvedValue(expectedResult);

    const result = await controller.execute(userId, groupId);

    expect(useCase.handle).toHaveBeenCalledWith({ userId, groupId });
    expect(result).toBe(expectedResult);
  });
});
