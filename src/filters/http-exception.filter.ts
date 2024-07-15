import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { IExceptionResponse } from 'src/interfaces/response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req: Request = ctx.getRequest();
    const res: Response = ctx.getResponse();

    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const response: IExceptionResponse = {
      statusCode: status,
      message: exception.getResponse()['message'],
      timestamp: new Date(),
      requestURL: req.url,
    };

    if (this.configService.get<string>('NODE_ENV') === 'development') {
      this.logger.debug(exception.stack);
    }

    return res.status(status).json(response);
  }
}
