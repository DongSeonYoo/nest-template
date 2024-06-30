import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from './dtos/create-user.dto';
import { IUser } from './entities/user.entity';
import { PagenationRequestDto } from 'src/dtos/pagenate.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async checkDuplicateEmail(email: IUser['email']): Promise<void> {
    const checkEmail = await this.prismaService.user.findUnique({
      select: {
        email: true,
      },
      where: {
        email,
        deletedAt: null,
      },
    });

    if (checkEmail?.email) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    return;
  }

  async create(createUserDto: CreateUserRequestDto): Promise<IUser['idx']> {
    await Promise.all([this.checkDuplicateEmail(createUserDto.email)]);

    const createUserResult = await this.prismaService.user.create({
      data: {
        ...createUserDto,
      },
      select: {
        idx: true,
      },
    });

    return createUserResult.idx;
  }

  async getUserList(
    pagenate: PagenationRequestDto,
  ): Promise<IUser.IUserListResponse> {
    const userListResult = await this.prismaService.user.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        idx: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        idx: 'asc',
      },
      skip: pagenate.getOffset(),
      take: pagenate.limit,
    });

    return {
      users: userListResult,
    };
  }

  async findUserByIdx(
    userIdx: IUser['idx'],
  ): Promise<IUser.IUserDetailResponse> {
    const userResult = await this.prismaService.user.findFirst({
      where: {
        idx: userIdx,
        deletedAt: null,
      },
    });

    if (!userResult) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }

    return {
      idx: userResult.idx,
      email: userResult.email,
      name: userResult.name,
      createdAt: userResult.createdAt,
      updatedAt: userResult.updatedAt,
    };
  }
}
