import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { StaticRouteMiddleware } from './middlewares/static-route.middleware';
import { ConfigService } from '@nestjs/config';
import { TransformationInterceptor } from './interceptors/response.interceptor';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { setSwagger } from './configs/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = app.get(ConfigService).get('PORT');

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.use(new StaticRouteMiddleware().use);
  app.useGlobalInterceptors(new TransformationInterceptor(new Reflector()));
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  setSwagger(app);

  await app.listen(PORT);
}
bootstrap();
