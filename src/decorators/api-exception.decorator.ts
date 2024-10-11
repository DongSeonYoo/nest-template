import { HttpException, Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ExamplesObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { IExceptionResponse } from 'src/interfaces/response.interface';

export interface ErrorResponseOption {
  /**
   * 에러 예시의 제목
   */
  exampleTitle: string;

  /**
   * 에러 스키마
   */
  schema: Type<HttpException>;
}

export const ApiExceptions = (...errorResponses: ErrorResponseOption[]) => {
  const examplesMap = new Map<number, ExamplesObject>();

  errorResponses.forEach((err: ErrorResponseOption) => {
    const errorInstance = new err.schema();
    const statusCode = errorInstance.getStatus();
    const errorResponse: IExceptionResponse = {
      message: errorInstance.message,
      requestURL: 'requestURL',
      statusCode: statusCode,
      timestamp: new Date(),
    };

    if (!examplesMap.has(statusCode)) {
      examplesMap.set(statusCode, {});
    }

    const currentExamples = examplesMap.get(statusCode);
    if (currentExamples) {
      examplesMap.set(statusCode, {
        ...currentExamples,
        [err.exampleTitle]: {
          value: errorResponse,
        },
      });
    }
  });

  return applyDecorators(
    ApiExtraModels(HttpException),
    ...Array.from(examplesMap.entries()).map(([statusCode, examples]) =>
      ApiResponse({
        status: statusCode,
        content: {
          'application/json': {
            schema: {
              oneOf: [
                {
                  $ref: getSchemaPath(HttpException),
                },
              ],
            },
            examples: examples,
          },
        },
      }),
    ),
  );
};
