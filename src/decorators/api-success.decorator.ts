import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiSuccess = <T>(schema: new (...args: any[]) => T) => {
  return applyDecorators(
    ApiExtraModels(schema),
    ApiOkResponse({
      schema: {
        properties: {
          statusCode: {
            type: 'number',
            example: 200,
          },
          message: {
            type: 'string',
            example: 'message',
          },
          requestURL: {
            type: 'string',
            example: '/api',
          },
          timestamp: {
            type: 'Date',
            example: '2024-06-28T05:53:14.341Z',
          },
          data: {
            $ref: getSchemaPath(schema),
          },
        },
      },
    }),
  );
};
