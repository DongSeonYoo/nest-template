import { HttpException, Type, applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiException = (...errors: Array<Type<HttpException>>) => {
  return applyDecorators(
    ...errors.map((error) => {
      const errorInstance = new error();

      return applyDecorators(
        ApiResponse({
          status: errorInstance.getStatus(),
          schema: {
            properties: {
              statusCode: {
                type: 'number',
                example: errorInstance.getStatus(),
              },
              message: {
                type: 'string',
                example: errorInstance.message,
              },
              requestURL: {
                type: 'string',
              },
              timestamp: {
                type: 'Date',
                example: new Date(),
              },
            },
          },
        }),
      );
    }),
  );
};
