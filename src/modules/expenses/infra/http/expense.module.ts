import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormExpenseModel } from '../database/typeorm/models/typeorm-expense.model';
import { TypeormSplitExpenseModel } from '../database/typeorm/models/typeorm-split-expense.model';
import { CreateExpenseController } from './controllers/create-expense.controller';
import { CreateExpenseUseCase } from '../../application/use-cases/create-expense.use-case';
import { UserModule } from '../../../../modules/users/infra/http/user.module';
import { GroupModule } from '../../../../modules/groups/infra/http/group.module';
import { RepositoryEnum } from '../../../../shared/enums/repositories';
import { TypeormExpenseRepository } from '../database/typeorm/repositories/typeorm-expense.repository';
import { TypeormSplitExpenseRepository } from '../database/typeorm/repositories/typeorm-split-expense.repository';
import { ServiceEnum } from '../../../../shared/enums/services';
import { SplitExpenseService } from '../../application/services/split-expense.service';
import { FindGroupExpenseController } from './controllers/find-group-expense.controller';
import { ExpenseService } from '../../application/services/expense.service';
import { FindGroupExpenseUseCase } from '../../application/use-cases/find-group-expense.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeormExpenseModel, TypeormSplitExpenseModel]),
    UserModule,
    GroupModule,
  ],
  controllers: [CreateExpenseController, FindGroupExpenseController],
  providers: [
    CreateExpenseUseCase,
    FindGroupExpenseUseCase,
    {
      provide: RepositoryEnum.EXPENSE,
      useClass: TypeormExpenseRepository,
    },
    {
      provide: RepositoryEnum.SPLIT_EXPENSE,
      useClass: TypeormSplitExpenseRepository,
    },
    {
      provide: ServiceEnum.EXPENSE,
      useClass: ExpenseService,
    },
    {
      provide: ServiceEnum.SPLIT_EXPENSE,
      useClass: SplitExpenseService,
    },
  ],
  exports: [],
})
export class ExpenseModule {}
