import { UserAuthEntity } from '../entities/user-auth.entity';

export interface IUserAuthRepository {
  create(userAuth: UserAuthEntity): Promise<void>;
}
