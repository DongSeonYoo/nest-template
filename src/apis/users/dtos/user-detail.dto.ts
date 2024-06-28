import { IUser } from '../entities/user.entity';

export class UserDetailRequestDto {
  /**
   * 유저 인덱스
   */
  idx: IUser['idx'];
}

export class UserDetailResponseDto implements IUser.IUserDetailResponse {
  /**
   * 유저 인덱스
   */
  idx: number;

  /**
   * 이메일
   */
  email: string;

  /**
   * 이름
   */
  name: string;

  /**
   * 생성일
   */
  createdAt: Date;

  /**
   * 최근 수정일
   */
  updatedAt: Date;
}
