import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TransformationInterceptor } from './interceptors/response.interceptor';
import { setSwagger } from './configs/swagger.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { PrismaClientExceptionFilter } from './filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = app.get(ConfigService).get('PORT');

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalInterceptors(new TransformationInterceptor(new Reflector()));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new GlobalExceptionFilter(new Logger()));
  app.useGlobalFilters(new PrismaClientExceptionFilter(new Logger()));

  setSwagger(app);

  await app.listen(PORT);
}
bootstrap();
