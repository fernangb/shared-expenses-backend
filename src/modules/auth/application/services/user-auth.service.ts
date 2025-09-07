import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';
import { IUserRepository } from 'src/modules/users/domain/repositories/user.repository';
import { IUserService } from 'src/modules/users/domain/services/user.service';
import { RepositoryEnum } from 'src/shared/enums/repositories';

@Injectable()
export class UserAuthService implements IUserService {
  constructor(
    @Inject(RepositoryEnum.USER)
    private readonly repository: IUserRepository,
  ) {}

  async create(user: UserEntity): Promise<void> {
    return this.repository.create(user);
  }

  async findById(id: string): Promise<UserEntity> {
    return this.repository.findById(id);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.repository.findByEmail(email);
  }

  async findByPhone(phone: string): Promise<UserEntity> {
    return this.repository.findByPhone(phone);
  }
}
