import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IExceptionResponse } from 'src/interfaces/response.interface';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    const status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    // 세부사항 로그 & 응답은 500으로
    this.logger.error(exception.message);

    const response: IExceptionResponse = {
      message: 'An unexpected error occurred',
      requestURL: req.url,
      statusCode: status,
      timestamp: new Date(),
    };

    return res.status(status).send(response);
  }
}
