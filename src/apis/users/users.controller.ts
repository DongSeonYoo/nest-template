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
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiSuccess } from 'src/decorators/api-success.decorator';
import { ApiException } from 'src/decorators/api-exception.decorator';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from './dtos/create-user.dto';
import { UserListResponseDto } from './dtos/user-list.dto';
import { LoginAuth } from 'src/decorators/jwt-auth';
import { PagenationRequestDto } from 'src/dtos/pagenate.dto';
import { UserDetailResponseDto } from './dtos/user-detail.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 회원 가입
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiSuccess(CreateUserResponseDto)
  @ApiException(HttpStatus.BAD_REQUEST, 'something errors')
  @ApiException(HttpStatus.CONFLICT, '이미 존재하는 이메일입니다.')
  create(@Body() createUserDto: CreateUserRequestDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * 전체 유저 조회
   */
  @Get('list')
  @ApiSuccess(UserListResponseDto)
  @ApiException(HttpStatus.BAD_REQUEST, 'someting errors')
  @LoginAuth()
  findAll(@Query() pagenate: PagenationRequestDto) {
    return this.usersService.getUserList(pagenate);
  }

  /**
   * 특정 유저 조회
   */
  @Get(':userIdx')
  @ApiSuccess(UserDetailResponseDto)
  @ApiException(HttpStatus.NOT_FOUND, '존재하지 않는 유저입니다.')
  findOne(@Param('userIdx', ParseIntPipe) userIdx: number) {
    return this.usersService.findUserByIdx(userIdx);
  }
}
