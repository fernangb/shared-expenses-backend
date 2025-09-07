import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserService } from '../../domain/services/user.service';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { RepositoryEnum } from '../../../../shared/enums/repositories';

@Injectable()
export class UserService implements IUserService {
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
