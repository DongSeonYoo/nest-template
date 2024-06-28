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
            example: '/api',
          },
          timestamp: {
            type: 'Date',
            example: '2024-06-28T05:53:14.341Z',
          },
        },
      },
    }),
  );
};
