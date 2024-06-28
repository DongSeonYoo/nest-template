import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IExceptionResponse } from 'src/interfaces/response.interface';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req: Request = ctx.getRequest();
    const res: Response = ctx.getResponse();

    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const response: IExceptionResponse = {
      message: exception.getResponse()['message'],
      statusCode: status,
      timestamp: new Date(),
      requestURL: req.url,
    };

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error({ err: response });
      // winston같은 로거를 사용해서 로그를 저장하는게 좋을듯?
    } else {
      this.logger.warn({ err: response });
    }

    return res.status(status).json(response);
  }
}
