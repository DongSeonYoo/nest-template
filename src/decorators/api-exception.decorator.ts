import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiException = (status: HttpStatus, description: string) => {
  return applyDecorators(
    ApiResponse({
      status: status,
      schema: {
        properties: {
          statusCode: {
            type: 'number',
            example: status,
          },
          message: {
            type: 'string',
            example: description,
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
};
