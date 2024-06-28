import { IUser } from '../entities/user.entity';
import { UserDetailResponseDto } from './user-detail.dto';

export class UserListResponseDto implements IUser.IUserListResponse {
  /**
   * 유저 리스트
   */
  users: UserDetailResponseDto[];
}
