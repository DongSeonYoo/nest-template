import { IUser } from '../entities/user.entity';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequestDto implements IUser.ICreateUserRequest {
  /**
   * 이메일
   */
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  /**
   * 이름
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * 비밀번호
   */
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class CreateUserResponseDto implements Pick<IUser, 'idx'> {
  /**
   * 생성된 사용자 인덱스
   */
  idx: number;
}
