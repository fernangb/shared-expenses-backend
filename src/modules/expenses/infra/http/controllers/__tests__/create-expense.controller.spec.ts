import { Test, TestingModule } from '@nestjs/testing';
import { CreateExpenseController } from '../create-expense.controller';
import { CreateExpenseUseCase } from '../../../../../../modules/expenses/application/use-cases/create-expense.use-case';
import { CreateExpenseInputDTO } from '../../dtos/create-expense.dto';

describe('CreateExpenseController (unit)', () => {
  let controller: CreateExpenseController;
  let useCase: CreateExpenseUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateExpenseController],
      providers: [
        {
          provide: CreateExpenseUseCase,
          useValue: {
            handle: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CreateExpenseController>(CreateExpenseController);
    useCase = module.get<CreateExpenseUseCase>(CreateExpenseUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call useCase.handle with correct DTO', async () => {
    const dto: CreateExpenseInputDTO = {
      userId: 'user-1',
      groupId: 'group-1',
      name: 'Test Expense',
      description: 'Test description',
      value: 100,
      dueDate: new Date(),
      paymentDate: new Date(),
    };

    await controller.create(dto);

    expect(useCase.handle).toHaveBeenCalledTimes(1);
    expect(useCase.handle).toHaveBeenCalledWith(dto);
  });
});
