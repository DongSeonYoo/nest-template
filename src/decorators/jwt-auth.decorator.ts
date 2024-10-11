import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiException } from './api-exception.decorator';
import { JwtGuard } from 'src/apis/auth/guards/jwt.guard';
import { JwtAuthException } from 'src/apis/auth/exceptions/jwt-auth-exception';

export const LoginAuth = () => {
  return applyDecorators(
    ApiBearerAuth(),
    UseGuards(JwtGuard),
    ApiException(JwtAuthException),
  );
};
