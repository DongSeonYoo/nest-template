import { HttpStatus, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiException } from './api-exception.decorator';
import { JwtGuard } from 'src/apis/auth/guards/jwt.guard';

export const LoginAuth = () => {
  return applyDecorators(
    ApiBearerAuth(),
    UseGuards(JwtGuard),
    ApiException(HttpStatus.UNAUTHORIZED, '로그인 필요한 서비스입니다'),
  );
};
