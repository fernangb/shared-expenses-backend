import { UserAuthEntity } from '../entities/user-auth.entity';

export interface IUserAuthService {
  create(userAuth: UserAuthEntity): Promise<void>;
}
