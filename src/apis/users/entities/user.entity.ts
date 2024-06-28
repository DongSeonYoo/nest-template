import { BaseTableOption } from 'src/utils/base-table.util';

export interface IUser extends BaseTableOption {
  idx: number;

  email: string;

  password: string;

  name: string;
}

export namespace IUser {
  export interface ICreateUserRequest
    extends Pick<IUser, 'email' | 'password' | 'name'> {}

  export interface IUserDetailResponse
    extends Pick<IUser, 'idx' | 'email' | 'name' | 'createdAt' | 'updatedAt'> {}

  export interface IUserListResponse {
    users: IUserDetailResponse[];
  }
}
