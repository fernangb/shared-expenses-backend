import { Test } from '@nestjs/testing';
import { DataSource, Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormUserAuthRepository } from '../typeorm-user-auth.repository';
import { TypeormUserAuthModel } from '../../models/typeorm-user-auth.model';
import { TypeormUserModel } from '../../../../../../../modules/users/infra/database/typeorm/models/typeorm-user.model';
import { UserAuthEntity } from '../../../../../../../modules/auth/domain/entities/user-auth.entity';

jest.setTimeout(30000);

describe('TypeormUserAuthRepository Integration', () => {
  let repository: TypeormUserAuthRepository;
  let userRepo: Repository<TypeormUserModel>;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [TypeormUserModel, TypeormUserAuthModel],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([TypeormUserAuthModel, TypeormUserModel]),
      ],
      providers: [TypeormUserAuthRepository],
    }).compile();

    repository = moduleRef.get(TypeormUserAuthRepository);
    userRepo = moduleRef.get('TypeormUserModelRepository');
    dataSource = moduleRef.get(DataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should create and find a UserAuthEntity by email', async () => {
    const user = userRepo.create({
      id: 'user-1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await userRepo.save(user);

    const userAuth = new UserAuthEntity({
      id: 'auth-1',
      user,
      password: 'hashedpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await repository.create(userAuth);

    const found = await repository.findByEmail('john@example.com');

    expect(found).toBeDefined();
    expect(found.id).toBe('auth-1');
    expect(found.user.email).toBe('john@example.com');
  });
});
