import { UserEntity } from '../entities/user.entity';

export interface IUserService {
  findById(id: string): Promise<UserEntity>;
}
