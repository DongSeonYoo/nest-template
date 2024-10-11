import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiSuccess } from 'src/decorators/api-success.decorator';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from './dtos/create-user.dto';
import { UserListResponseDto } from './dtos/user-list.dto';
import { PagenationRequestDto } from 'src/dtos/pagenate.dto';
import { UserDetailResponseDto } from './dtos/user-detail.dto';
import { LoginAuth } from 'src/decorators/jwt-auth.decorator';
import { UserEmailExistsException } from './exceptions/user-email-exists.exception';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { ApiExceptions } from 'src/decorators/api-exception.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 회원 가입
   */
  @Post()
  @LoginAuth()
  @HttpCode(HttpStatus.OK)
  @ApiSuccess(CreateUserResponseDto)
  @ApiExceptions({
    exampleTitle: '중복된 이메일이 존재할 경우',
    schema: UserEmailExistsException,
  })
  create(@Body() createUserDto: CreateUserRequestDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * 전체 유저 조회
   */
  @Get('list')
  @LoginAuth()
  @ApiSuccess(UserListResponseDto)
  @LoginAuth()
  findAll(@Query() pagenate: PagenationRequestDto) {
    return this.usersService.getUserList(pagenate);
  }

  /**
   * 특정 유저 조회
   */
  @Get(':userIdx')
  @ApiSuccess(UserDetailResponseDto)
  @ApiExceptions({
    exampleTitle: '사용자를 찾지 못했을 경우',
    schema: UserNotFoundException,
  })
  findOne(@Param('userIdx', ParseIntPipe) userIdx: number) {
    return this.usersService.findUserByIdx(userIdx);
  }
}
