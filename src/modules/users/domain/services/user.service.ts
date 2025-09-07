import { UserEntity } from '../entities/user.entity';

export interface IUserService {
  create(user: UserEntity): Promise<void>;
  findById(id: string): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  findByPhone(phone: string): Promise<UserEntity>;
}
