import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { PrismaClientExceptionFilter } from './filters/prisma-exception.filter';
import { UnhandledExceptionFilter } from './filters/unhandled-exception.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { SuccessResponseInterceptor } from './interceptors/response.interceptor';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'html'),
      renderPath: '/',
      serveStaticOptions: {
        extensions: ['html'],
      },
      exclude: ['/api/(.*)'],
    }),
    UsersModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggerMiddleware,
    Logger,
    {
      provide: APP_FILTER,
      useClass: UnhandledExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: SuccessResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
